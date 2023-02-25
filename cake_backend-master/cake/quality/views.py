import csv
import datetime
import os
from wsgiref.util import FileWrapper

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from quality.models import (
    Cake,
    QualityMetrics,
    Questionnaire,
    Country,
    Manufacturer,
    GlobalReportCSV,
    CakeEstimationReportTXT,
    Comment,
)
from quality.serializers import (
    CakeQualityMetricsAndQuestionnaireSerializer,
    CakeSerializer,
    LoginSerializer,
    QualityMetricsSerializer,
    QuestionnaireSerializer,
    SignUpSerializer,
    UserSerializer,
    ManufacturerSerializer,
    CountrySerializer,
    CommentSerializer,
)
from rest_framework import mixins, permissions, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class CakeView(viewsets.ModelViewSet):
    """Список тортов, добавление, удаление и изменение торта"""

    queryset = Cake.objects.all()
    serializer_class = CakeSerializer
    permissions = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filterset_fields = ["manufacturer__id", "country__id"]

    def destroy(self, request, *args, **kwargs):
        if self.get_object().id == 1:
            return Response(
                "Запрещено удалять базовый объект", status=status.HTTP_403_FORBIDDEN
            )
        return super(CakeView, self).destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        user = request.user
        if self.get_object().id == 1 and not user.is_superuser:
            return Response(
                "Только администратор может редактировать базовый объект",
                status=status.HTTP_403_FORBIDDEN,
            )
        return super(CakeView, self).update(request, *args, **kwargs)


class CakeQualityMetricsAndQuestionnaireView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    """Список результатов оценки качества товара, детальой информации о товаре и результатов опроса"""

    queryset = Cake.objects.all()
    serializer_class = CakeQualityMetricsAndQuestionnaireSerializer


class ExportTXTCakeQualityReport(APIView):
    """Эксопорт в .txt результатов оценки качества товара, детальой информации о товаре и результатов опроса"""

    def get(self, request, cake_id):
        cake = Cake.objects.get(id=cake_id)
        lines = []
        lines.append("Наименование: " + cake.name + "\n")
        lines.append("Средняя оценка: " + str(cake.average_grade) + "\n")
        try:
            quality_metrics_data = QualityMetricsSerializer(cake.quality_info).data
            quality_metrics_data_provided = True
        except ObjectDoesNotExist:
            quality_metrics_data = {}
            quality_metrics_data_provided = False
        quality_metrics = (
            ["Наличие маргарина", quality_metrics_data.get("margarine_presence")],
            [
                "Наличие консервантов E200-299",
                quality_metrics_data.get("preservatives_presence"),
            ],
            [
                "Наличие антиокислителей E300-399",
                quality_metrics_data.get("antioxidants_presence"),
            ],
            [
                "Наличие бензойной кислоты Е-210",
                quality_metrics_data.get("benzoic_acid_presence"),
            ],
            [
                "Наличие бензоата натрия Е-211",
                quality_metrics_data.get("sodium_benzoate_presence"),
            ],
            [
                "Наличие пиросульфита натрия Е-223",
                quality_metrics_data.get("sodium_pyrosulfite_presence"),
            ],
            [
                "Наличие пиросульфита калия Е-224",
                quality_metrics_data.get("potassium_pyrosulfite_presence"),
            ],
            [
                "Наличие сульфита кальция Е-226",
                quality_metrics_data.get("calcium_sulfite_presence"),
            ],
            ["Наличие низина Е-234", quality_metrics_data.get("nisin_presence")],
            [
                "Наличие бутилгидроксианизола E-320",
                quality_metrics_data.get("butylhydroxyanisole_presence"),
            ],
        )
        ingredients_count = 0
        for name, ingredient in quality_metrics:
            if ingredient:
                lines.append(str(name) + "\n")
                ingredients_count += 1
        lines.append(f"Выявлено {ingredients_count} вредных добавок" + "\n")
        if cake.average_grade and quality_metrics_data_provided:
            if ingredients_count < 4 and cake.average_grade >= 3:
                lines.append(f"ОЦЕНКА ПРОЙДЕНА" + "\n")
            elif not ingredients_count < 4 and not cake.average_grade >= 3:
                lines.append(
                    f"ОЦЕНКА НЕ ПРОЙДЕНА: средняя оценка ниже трех и более трех вредных добавок"
                    + "\n"
                )
            elif not cake.average_grade >= 3:
                lines.append(f"ОЦЕНКА НЕ ПРОЙДЕНА: средняя оценка ниже трех" + "\n")
            elif not ingredients_count < 4:
                lines.append(f"ОЦЕНКА НЕ ПРОЙДЕНА: более трех вредных добавок" + "\n")
        else:
            lines.append(
                f"ОЦЕНКА НЕ ПРОЙДЕНА: нет данных об анкетировании и(или) нет данных о наличии вредных добавок"
                + "\n"
            )

        current_datetime_filename = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")+'.txt'

        with open(current_datetime_filename, mode='w') as file:
            file.writelines(lines)
        CakeEstimationReportTXT.objects.create(file=current_datetime_filename, cake=cake)
        f = FileWrapper(open(current_datetime_filename))
        response = HttpResponse(f, content_type="text/txt")
        response["Content-Disposition"] = f'attachment; filename="{current_datetime_filename}"'
        os.remove(current_datetime_filename)
        return response


class ExportCSVCakeQualityView(APIView):
    """Эксопорт в .csv результатов оценки качества товара, детальой информации о товаре и результатов опроса"""

    def get(self, request, *args, **kwargs):
        current_datetime_filename = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + '.csv'
        with open(current_datetime_filename, mode='w') as file:
            writer = csv.writer(file, delimiter=',',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(
                [
                    "id",
                    "Наименование",
                    "Средняя оценка по результатам опроса",
                    "Наличие маргарина",
                    "Наличие консервантов E200-299",
                    "Наличие антиокислителей E300-399",
                    "Наличие бензойной кислоты Е-210",
                    "Наличие бензоата натрия Е-211",
                    "Наличие пиросульфита натрия Е-223",
                    "Наличие пиросульфита калия Е-224",
                    "Наличие сульфита кальция Е-226",
                    "Наличие низина Е-234",
                    "Наличие бутилгидроксианизола E-320",
                ]
            )

            for cake in Cake.objects.all():
                try:
                    quality_metrics_data = QualityMetricsSerializer(cake.quality_info).data
                except ObjectDoesNotExist:
                    quality_metrics_data = {}
                row = (
                    cake.id,
                    cake.name,
                    cake.average_grade,
                    quality_metrics_data.get("margarine_presence"),
                    quality_metrics_data.get("preservatives_presence"),
                    quality_metrics_data.get("antioxidants_presence"),
                    quality_metrics_data.get("benzoic_acid_presence"),
                    quality_metrics_data.get("sodium_benzoate_presence"),
                    quality_metrics_data.get("sodium_pyrosulfite_presence"),
                    quality_metrics_data.get("potassium_pyrosulfite_presence"),
                    quality_metrics_data.get("calcium_sulfite_presence"),
                    quality_metrics_data.get("nisin_presence"),
                    quality_metrics_data.get("butylhydroxyanisole_presence"),
                )
                writer.writerow(row)
        GlobalReportCSV.objects.create(file=current_datetime_filename)
        f = FileWrapper(open(current_datetime_filename))
        response = HttpResponse(f, content_type="text/csv")
        response["Content-Disposition"] = f'attachment; filename="{current_datetime_filename}"'
        os.remove(current_datetime_filename)

        return response


class CountryView(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
):
    """Список стран, a также добавление"""

    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    # permissions = [permissions.IsAuthenticatedOrReadOnly]


class ManufacturerView(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
):
    """Список производителей, a также добавление"""

    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    # permissions = [permissions.IsAuthenticatedOrReadOnly]


class CommentView(APIView):
    def get(self, request, cake_id):
        cake = Cake.objects.get(id=cake_id)
        comments = Comment.objects.filter(cake=cake)
        data = CommentSerializer(instance=comments, many=True).data,
        return Response(
                data=data,
                status=status.HTTP_200_OK,
            )
    def post(self, request, cake_id):
        cake = Cake.objects.get(id=cake_id)
        serializer = CommentSerializer(data=request.data, context={'cake': cake, 'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QualityMetricsView(
    viewsets.GenericViewSet,
    # mixins.ListModelMixin,
    mixins.CreateModelMixin,
    # mixins.DestroyModelMixin,
):
    """Список результатов оценки качества товара, a также добавление оценки"""

    queryset = QualityMetrics.objects.all()
    serializer_class = QualityMetricsSerializer


class QuestionnaireView(
    viewsets.GenericViewSet,
    # mixins.ListModelMixin,
    mixins.CreateModelMixin,
    # mixins.RetrieveModelMixin,
):
    # """Просмотр результатов опросов, а также прохождение опроса"""
    """Пррохождение анкетирования"""

    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer


class SignUpView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """Регистрация пользователя"""
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"Success": "User created successfully"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class LoginView(ObtainAuthToken):
    """Вход пользователя"""
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "user": UserSerializer(instance=user).data}
        )

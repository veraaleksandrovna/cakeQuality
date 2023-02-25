from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.db.models import Avg
from django.utils.translation import gettext_lazy as _
from quality.models import Cake, QualityMetrics, Questionnaire, Country, Manufacturer, Comment
from rest_framework import serializers


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = ("id", "name")


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ("id", "name")


class QualityMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityMetrics
        fields = (
            "id",
            "cake",
            "margarine_presence",
            "preservatives_presence",
            "antioxidants_presence",
            "benzoic_acid_presence",
            "sodium_benzoate_presence",
            "sodium_pyrosulfite_presence",
            "potassium_pyrosulfite_presence",
            "calcium_sulfite_presence",
            "nisin_presence",
            "butylhydroxyanisole_presence",
        )
        read_only_fields = [
            "id",
        ]

    def to_representation(self, obj):
        self.fields["cake"] = serializers.CharField(source="cake.name")
        return super().to_representation(obj)


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = (
            "id",
            "cake",
            "user",
            "shape_and_appearance",
            "structure_and_consistency",
            "taste_and_smell",
            "grade",
        )
        read_only_fields = [
            "id",
            "user",
            "grade",
        ]

    def to_representation(self, obj):
        self.fields["cake"] = serializers.CharField(source="cake.name")
        self.fields["user"] = serializers.CharField(source="user.username")

        return super().to_representation(obj)

    def create(self, validated_data):
        user = self.context["request"].user
        questionnaire = Questionnaire.objects.create(user=user, **validated_data)
        return questionnaire

    def validate(self, attrs):
        user = attrs.get("user")
        cake = attrs.get("cake")

        if cake == 1 and not user.is_superuser:
            msg = _('Только администрато может оценивать базовый объект".')
            raise serializers.ValidationError(msg, code="authorization")

        return attrs


class CakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cake
        fields = (
            "id",
            "name",
            "manufacturer",
            "description",
            "composition",
            "country",
            "image",
        )

    def to_representation(self, obj):
        self.fields["manufacturer"] = serializers.CharField(source="manufacturer.name")
        self.fields["country"] = serializers.CharField(source="country.name")

        return super().to_representation(obj)


class CakeQualityMetricsAndQuestionnaireSerializer(CakeSerializer):
    class Meta(CakeSerializer.Meta):
        fields = CakeSerializer.Meta.fields + (
            "average_grade",
            "questionnaire_results",
            "quality_metrics",
        )

    quality_metrics = serializers.SerializerMethodField()
    questionnaire_results = serializers.SerializerMethodField()
    average_grade = serializers.SerializerMethodField()

    def get_average_grade(self, obj):
        return obj.average_grade

    def get_quality_metrics(self, obj):
        try:
            return QualityMetricsSerializer(obj.quality_info).data
        except ObjectDoesNotExist:
            return {}

    def get_questionnaire_results(self, obj):
        return QuestionnaireSerializer(obj.questionnaire_results, many=True).data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "is_superuser")


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("id", "user",  "cake", "text", 'created_at')
        read_only_fields = [
            "id",
            "created_at",
            "user",
            "cake",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        cake = self.context["cake"]
        obj = Comment.objects.create(user=user, cake=cake, **validated_data)
        return obj

    def to_representation(self, obj):
        self.fields["user"] = serializers.CharField(source="user.username")
        self.fields["created_at"] = serializers.DateTimeField(format="%H:%M:%S %d-%m-%Y")
        return super().to_representation(obj)



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(label=_("Username"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(
                request=self.context.get("request"),
                username=username,
                password=password,
            )
            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
        )

        extra_kwargs = {
            "email": {
                "write_only": True,
            },
            "username": {"write_only": True},
            "password": {"write_only": True, "min_length": 8},
        }

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            return user

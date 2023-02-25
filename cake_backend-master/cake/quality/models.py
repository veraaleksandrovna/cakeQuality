from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import Avg
from django.utils.translation import gettext_lazy as _

# TODO: custom user, engrydients


class Country(models.Model):
    name = models.CharField(_("Название страны"), max_length=255, unique=True)

    def __str__(self):
        return self.name


class Manufacturer(models.Model):
    name = models.CharField(_("Название производителя"), max_length=255, unique=True)

    def __str__(self):
        return self.name


class Cake(models.Model):
    class Meta:
        ordering = ["id"]

    image = models.ImageField(
        _("image"), upload_to="cakes", default="cakes/default.jpg"
    )
    name = models.CharField(_("Наименоване"), max_length=255)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    description = models.TextField(
        _("Описание"),
    )
    composition = models.TextField(
        _("Состав"),
    )

    def __str__(self):
        return self.name

    @property
    def average_grade(self):
        result = Questionnaire.objects.filter(cake_id=self.pk).aggregate(Avg("grade"))[
            "grade__avg"
        ]
        return round(result, 2) if result else None


class QualityMetrics(models.Model):
    cake = models.OneToOneField(
        Cake, on_delete=models.CASCADE, related_name="quality_info"
    )
    margarine_presence = models.BooleanField(_("Наличие маргарина"), default=False)
    preservatives_presence = models.BooleanField(
        _("Наличие консервантов E200-299"), default=False
    )
    antioxidants_presence = models.BooleanField(
        _("Наличие антиокислителей E300-399"), default=False
    )
    benzoic_acid_presence = models.BooleanField(
        _("Наличие бензойной кислоты Е-210"), default=False
    )
    sodium_benzoate_presence = models.BooleanField(
        _("Наличие бензоата натрия Е-211"), default=False
    )
    sodium_pyrosulfite_presence = models.BooleanField(
        _("Наличие пиросульфита натрия Е-223 "), default=False
    )
    potassium_pyrosulfite_presence = models.BooleanField(
        _("Наличие пиросульфита калия Е-224"), default=False
    )
    calcium_sulfite_presence = models.BooleanField(
        _("Наличие сульфита кальция Е-226"), default=False
    )
    nisin_presence = models.BooleanField(_("Наличие низина Е-234 "), default=False)
    butylhydroxyanisole_presence = models.BooleanField(
        _("Наличие бутилгидроксианизола E-320"), default=False
    )

    def __str__(self):
        return self.cake.name


class Questionnaire(models.Model):
    cake = models.ForeignKey(
        Cake, on_delete=models.CASCADE, related_name="questionnaire_results"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shape_and_appearance = models.PositiveSmallIntegerField(
        _("Форма и внешний вид"),
        default=3,
        validators=[MinValueValidator(2), MaxValueValidator(5)],
    )
    structure_and_consistency = models.PositiveSmallIntegerField(
        _("Структура и консистенция"),
        default=3,
        validators=[MinValueValidator(2), MaxValueValidator(5)],
    )
    taste_and_smell = models.PositiveSmallIntegerField(
        _("Вкус и запах"),
        default=3,
        validators=[MinValueValidator(2), MaxValueValidator(5)],
    )
    grade = models.FloatField(editable=False)

    def save(self, *args, **kwargs):
        self.grade = self.get_grade()
        super(Questionnaire, self).save(*args, **kwargs)

    def get_grade(self):
        return round(
            self.shape_and_appearance * 0.3
            + self.structure_and_consistency * 0.2
            + self.taste_and_smell * 0.5,
            2,
        )

    def __str__(self):
        return self.cake.name


class CakeEstimationReportTXT(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE)
    file = models.FileField(upload_to="cake_estimate_reports_txt")

    def __str__(self):
        return self.cake.name


class GlobalReportCSV(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to="global_reports_csv")
    def __str__(self):
        return self.created_at.strftime("%Y-%m-%d %H:%M:%S")


class Comment(models.Model):
    text = models.TextField(
        _("Текст"),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cake = models.ForeignKey(Cake, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

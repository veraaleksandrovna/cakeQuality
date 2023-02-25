from django.urls import path
from rest_framework import routers

from .views import (
    CakeQualityMetricsAndQuestionnaireView,
    CakeView,
    ExportCSVCakeQualityView,
    ExportTXTCakeQualityReport,
    LoginView,
    QualityMetricsView,
    QuestionnaireView,
    SignUpView,
    ManufacturerView,
    CountryView,
    CommentView,
)

router = routers.DefaultRouter()

router.register("signup", SignUpView, basename="signup")
router.register("questionnaire", QuestionnaireView, basename="questionnaire")
router.register("quality-metrics", QualityMetricsView, basename="quality-metrics")
router.register("cake", CakeView, basename="cake")
router.register("manufacturers", ManufacturerView, basename="manufacturers")
router.register("countries", CountryView, basename="countries")
router.register(
    "cake-quality-metrics-and-questionnaire",
    CakeQualityMetricsAndQuestionnaireView,
    basename="cake-quality-metrics-and-questionnaire",
)

urlpatterns = router.urls
urlpatterns += [
    path(
        "export-csv-cake-quality/",
        ExportCSVCakeQualityView.as_view(),
        name="export-csv-cake-quality",
    ),
    path(
        "export-txt-cake-quality/<int:cake_id>/",
        ExportTXTCakeQualityReport.as_view(),
        name="export-txt-cake-quality",
    ),
    path(
        "comments/<int:cake_id>/",
        CommentView.as_view(),
        name="comments",
    ),
    path("login/", LoginView.as_view(), name="login"),
]

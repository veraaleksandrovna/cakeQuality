from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestCakeQualityMetricsAndQuestionnaire(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]

    def test_get_list(self):
        response = self.client.get(reverse('cake-quality-metrics-and-questionnaire-list'), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )
        self.assertEqual(len(response.data), 5)

    def test_get_detail(self):
        response = self.client.get(reverse('cake-quality-metrics-and-questionnaire-detail', args=(1,)), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )
        self.assertEqual(len(response.data['quality_metrics']), 12)
        self.assertEqual(len(response.data['questionnaire_results']), 1)
        self.assertEqual(response.data['average_grade'], 3.7)
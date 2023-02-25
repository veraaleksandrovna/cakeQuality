from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestQualityMetricsView(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]
    url_name = "quality-metrics-list"

    def test_successful_post(self):
        data = {
            "margarine_presence": True,
            "preservatives_presence": False,
            "antioxidants_presence": False,
            "benzoic_acid_presence": True,
            "sodium_benzoate_presence": False,
            "sodium_pyrosulfite_presence": False,
            "potassium_pyrosulfite_presence": False,
            "calcium_sulfite_presence": False,
            "nisin_presence": False,
            "butylhydroxyanisole_presence": False,
            "cake": 5,
        }
        response = self.client.post(reverse(self.url_name), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )
        self.assertEqual(response.data['margarine_presence'], True)

    def test_unsuccessful_post(self):
        data = {
            "margarine_presence": True,
            "preservatives_presence": False,
            "antioxidants_presence": False,
            "benzoic_acid_presence": True,
            "sodium_benzoate_presence": False,
            "sodium_pyrosulfite_presence": False,
            "potassium_pyrosulfite_presence": False,
            "calcium_sulfite_presence": False,
            "nisin_presence": False,
            "butylhydroxyanisole_presence": False,
            "cake": 2,
        }
        response = self.client.post(reverse(self.url_name), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST, response.content
        )
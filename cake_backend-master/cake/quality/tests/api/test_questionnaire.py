from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestQuestionnaire(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]
    url_name = "questionnaire-list"

    def test_questionnaire_post(self):
        data = {
            "shape_and_appearance": 4,
            "structure_and_consistency": 2,
            "taste_and_smell": 2,
            "cake": 2,
        }
        response = self.client.post(reverse(self.url_name), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )
        self.assertEqual(response.data['grade'], 2.6)


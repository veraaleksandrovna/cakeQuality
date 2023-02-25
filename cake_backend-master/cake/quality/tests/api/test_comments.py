from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestComments(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]
    url_name = "comments"

    def test_comment_get(self):
        response = self.client.get(reverse(self.url_name, kwargs={"cake_id": 1}), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )
        self.assertEqual(response.data[0][0]['text'], 'Вкусно')

    def test_comment_add(self):
        data = {
            'text': 'Качестваенно'
        }
        response = self.client.post(reverse(self.url_name, kwargs={"cake_id": 2}), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )
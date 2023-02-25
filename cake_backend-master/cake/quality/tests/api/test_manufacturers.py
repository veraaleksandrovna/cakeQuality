from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestManufacturers(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]
    url_name = "manufacturers-list"

    def test_manufacturers_get(self):
        response = self.client.get(reverse(self.url_name), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )
        self.assertEqual(len(response.data), 6)

    def test_manufacturer_add(self):
        data = {
            'name': 'Фиолетовый пищевик'
        }
        response = self.client.post(reverse(self.url_name), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )
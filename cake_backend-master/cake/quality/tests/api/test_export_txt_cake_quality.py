import csv
import io

from django.urls import reverse
from rest_framework import status
from ..base_auth_api_test_case import BaseAuthAPITestCaseView


class TestExportTXTCakeQuality(BaseAuthAPITestCaseView):
    fixtures = ["quality/fixtures/users.json", "quality/fixtures/fixtures.json"]
    url_name = "export-txt-cake-quality"

    def test_export_txt_cake_quality_approved_get(self):
        response = self.client.get(reverse(self.url_name, kwargs={'cake_id': 1}), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )
        content = response.content.decode('utf-8')
        csv_reader = csv.reader(io.StringIO(content))
        body = list(csv_reader)
        self.assertEqual(body[-1], ['ОЦЕНКА ПРОЙДЕНА'])

    def test_export_txt_cake_quality_not_approved_get(self):
        response = self.client.get(reverse(self.url_name, kwargs={'cake_id': 3}), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )
        content = response.content.decode('utf-8')
        csv_reader = csv.reader(io.StringIO(content))
        body = list(csv_reader)
        self.assertEqual(body[-1], ['ОЦЕНКА НЕ ПРОЙДЕНА: более трех вредных добавок'])

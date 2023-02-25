
from django.contrib import admin
from django.utils.html import format_html
from quality.models import (
    Cake,
    QualityMetrics,
    Comment,
    Questionnaire,
    Country,
    Manufacturer,
    GlobalReportCSV,
    CakeEstimationReportTXT,
)

admin.site.register(Cake)
admin.site.register(Comment)
admin.site.register(QualityMetrics)
admin.site.register(Questionnaire)
admin.site.register(Country)
admin.site.register(Manufacturer)


class CakeEstimationReportTXTAdmin(admin.ModelAdmin):
    # add the link to the various fields attributes (fieldsets if necessary)
    readonly_fields = ('file_link',)
    fields = ('cake', 'file_link', 'file')
    def file_link(self, obj):
        if obj.file:
            return format_html("<a href='%s' download>Download</a>" % (obj.file.url,))
        else:
            return "No attachment"
    file_link.allow_tags = True
    file_link.short_description = 'Download File'


class GlobalReportCSVAdmin(admin.ModelAdmin):
    # add the link to the various fields attributes (fieldsets if necessary)
    readonly_fields = ('file_link',)
    fields = ('file_link', 'file')
    def file_link(self, obj):
        if obj.file:
            return format_html("<a href='%s' download>Download</a>" % (obj.file.url,))
        else:
            return "No attachment"
    file_link.allow_tags = True
    file_link.short_description = 'Download File'


admin.site.register(CakeEstimationReportTXT, CakeEstimationReportTXTAdmin)
admin.site.register(GlobalReportCSV, GlobalReportCSVAdmin)

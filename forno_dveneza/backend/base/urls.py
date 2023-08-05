from django.urls import path, include, re_path
# from rest_framework.urls import include

from . import views
from django.views.generic import TemplateView


urlpatterns = [
    path('', views.index, name='index'),
    # path('api-auth/', include('rest-framework.urls'))

]
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html')
)]
from django.urls import path
from home.views import BlogView, PublicBlog, index_view, blogdetails_view

urlpatterns = [
    path('blog/', BlogView.as_view()),
    path('allPost/', PublicBlog.as_view()),
    path('homeblog/', index_view),
    path('homeblog/blogdetails/', blogdetails_view)
]
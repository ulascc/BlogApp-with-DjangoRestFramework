$(document).ready(function() {
    // Sayfa yüklendiğinde blogları al ve listele
    fetchBlogs();

    // Blog oluşturma formunu submit edildiğinde
    $('#create-blog-form').on('submit', function(event) {
        event.preventDefault();
        createBlog();
    });

    // Blog güncelleme formunu submit edildiğinde
    $('#update-blog-form').on('submit', function(event) {
        event.preventDefault();
        updateBlog();
    });

    // Blog silme butonuna tıklandığında
    $('#blogs-list').on('click', '.delete-blog-btn', function() {
        const blogUid = $(this).data('uid');
        deleteBlog(blogUid);
    });
});

// Blogları API'den alıp listeleme
function fetchBlogs() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/home/blog/', // API endpointini buraya yazın
        type: 'GET',
        success: function(response) {
            // API'den gelen verileri kullanarak blogları listeleme
            const blogs = response.data;
            let blogList = '';
            for (const blog of blogs) {
                blogList += `
                    <div class="card mb-3">
                        <div class="card-header">${blog.title}</div>
                        <div class="card-body">
                            <p class="card-text">${blog.blog_text}</p>
                            <button class="btn btn-primary edit-blog-btn" data-uid="${blog.uid}">Düzenle</button>
                            <button class="btn btn-danger delete-blog-btn" data-uid="${blog.uid}">Sil</button>
                        </div>
                    </div>
                `;
            }
            $('#blogs-list').html(blogList);
        },
        error: function(error) {
            console.error('Bir hata oluştu:', error);
        }
    });
}

// Blog oluşturma işlemi
function createBlog() {
    const formData = {
        title: $('#title').val(),
        blog_text: $('#blog-text').val()
    };
    $.ajax({
        url: 'http://127.0.0.1:8000/api/home/blog/', // API endpointini buraya yazın
        type: 'POST',
        data: formData,
        success: function(response) {
            // Yeni blog oluşturulduktan sonra listeyi güncelleme
            fetchBlogs();
            // Formu temizleme
            $('#create-blog-form')[0].reset();
        },
        error: function(error) {
            console.error('Bir hata oluştu:', error);
        }
    });
}

// Blog güncelleme işlemi
function updateBlog() {
    const formData = {
        uid: $('#update-uid').val(),
        title: $('#update-title').val(),
        blog_text: $('#update-blog-text').val()
    };
    $.ajax({
        url: 'http://127.0.0.1:8000/api/home/blog/', // API endpointini buraya yazın
        type: 'PATCH',
        data: formData,
        success: function(response) {
            // Blog güncellendikten sonra listeyi güncelleme
            fetchBlogs();
            // Formu temizleme
            $('#update-blog-form')[0].reset();
        },
        error: function(error) {
            console.error('Bir hata oluştu:', error);
        }
    });
}

// Blog silme işlemi
function deleteBlog(blogUid) {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/home/blog/', // API endpointini buraya yazın
        type: 'DELETE',
        data: { uid: blogUid },
        success: function(response) {
            // Blog silindikten sonra listeyi güncelleme
            fetchBlogs();
        },
        error: function(error) {
            console.error('Bir hata oluştu:', error);
        }
    });
}

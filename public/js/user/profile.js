$(document).ready(function () {
    $('.add-btn').on('click', function () {
        $('#add-input').click();
    });

    $('#add-input').on('change', function () {
        var addInput = $('#add-input');

        if (addInput.val() != '') {
            var formData = new FormData();

            formData.append('upload', addInput[0].files[0]);
            $('#completed').html('File Uploaded Successfully');

            $.ajax({
                url: '/userupload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    addInput.val('');
                }
            })
        }
        showImage(this);
    });


    $('#profile').on('click', function () {
        let username = $('#username').val();
        let fullname = $('#fullname').val();
        let country = $('#country').val();
        
        let gender = $('#gender').val();
        let mantra = $('#mantra').val();
        let userImage = $('#add-input').val();
        let image = $('#user-image').val();

        let valid = true;
        if (userImage === '') {
            $('#add-input').val(image);
        }
        if (username == '' || fullname == '' || country == '' || gender == '' || mantra == '') {
            valid = false;
            $('#error').html('<div class="alert alert-danger">You canot submit an empty field </div>')

        } else {
            userImage = $('#add-input').val();
            $('#error').html('');
        }
        if (valid === true) {
            $.ajax({
                url: '/settings/profile',
                type: 'POST',
                data: {
                    username: username,
                    fullname: fullname,
                    gender: gender,
                    country: country,
                    mantra: mantra,
                    upload: userImage
                },
                success: function () {
                    setTimeout(function () {
                        window.location.reload();
                    }, 500)
                }
            })
        } else {
            return false;
        }
    });

});

function showImage(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#show_img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
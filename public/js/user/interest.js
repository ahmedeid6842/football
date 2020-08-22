$(document).ready(function () {
    $('#favClubBtn').on('click', function () {
        let favClub = $('#favClub').val();

        let valid = true;
        if (favClub === '') {
            valid = false;
            $('#error').html('<div class="alert alert-danger">You canot submit empty field</div>')
        } else {
            $('#error').html('');
        }

        if (valid === true) {
            $.ajax({
                url: '/settings/interests',
                type: 'POST',
                data: {
                    favClub: favClub
                },
                success: function () {
                    $('#favPlayer').val('');
                    setTimeout(function () {
                        window.location.reload();
                    }, 400)
                }
            })
        }

    })
    $('#favPlayerBtn').on('click', function () {
        let favPlayer = $('#favPlayer').val();

        let valid = true;
        if (favPlayer === '') {
            valid = false;
            $('#error').html('<div class="alert alert-danger">You canot submit empty field</div>')
        } else {
            $('#error').html('');
        }

        if (valid === true) {
            $.ajax({
                url: '/settings/interests',
                type: 'POST',
                data: {
                    favPlayer: favPlayer
                },
                success: function () {
                    $('#favPlayer').val('');
                    setTimeout(function () {
                        window.location.reload();
                    }, 400)
                }
            })
        }

    })
    $('#nationalTeamBtn').on('click', function () {
        let nationalTeam = $('#nationalTeam').val();

        let valid = true; 
        if (nationalTeam === '') {
            valid = false;
            $('#error').html('<div class="alert alert-danger">You canot submit empty field</div>')
        } else {
            $('#error').html('');
        }

        if (valid === true) {
            $.ajax({
                url: '/settings/interests',
                type: 'POST',
                data: {
                    nationalTeam: nationalTeam
                },
                success: function () {
                    $('#nationalTeam').val('');
                    setTimeout(function () {
                        window.location.reload();
                    }, 400)
                }
            })
        }

    })
})
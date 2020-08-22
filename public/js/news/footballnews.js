$(document).ready(function () {
    LoadData('.paginate')
    return GetResult();
});

function GetResult() {
    $.ajax({
        url: 'https://content.guardianapis.com/football?page-size=50&order-by=newest&show-fields=all&api-key=eabd5771-ef9e-4698-899b-d854ef9be457',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let results = '';
            $.each(data.response.results, function (i) {
                const date = new Date(Date.parse(data.response.results[i].webPublicationDate)).toDateString()
                results +=
                    `<form class="paginate">
                    <div class="col-md-12 news-post">
                        <div class="row">
                            <a href="${data.response.results[i].webUrl}" target="_blank" style="color:#4aa1f3; text-decoration:none;">
                                <div class="col-md-2">
                                    <img src="${data.response.results[i].fields.thumbnail}" class="img-responsive" />
                                </div>
                                <div class="col-md-10">
                                    <h4 class="news-date">${date}</h4>
                                    <h3>${data.response.results[i].fields.headline}</h3>
                                    <p class="news-text">${data.response.results[i].webTitle}</p>
                                </div>
                            </a> 
                        </div>
                    </div>
                </form>`
            })
            $('#newsResults').html(results);
            $('.paginate').slice(0, 5).show();
        }
    })
}

function LoadData(divClass) {
    $('#loadMore').on('click', function (e) {
        e.preventDefault();
        $(divClass + ":hidden")
            .slice(0, 5)
            .slideDown();

        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 2000);
    })

    $('#linkTop').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    })

}
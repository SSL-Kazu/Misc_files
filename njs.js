$(document).ready(function(){
    $('form').submit(function(event){
        event.preventDefault();
        var prompt = $('#prompt').val();
        $.ajax({
            url: '/get_answer',
            method: 'POST',
            data: {
                prompt: prompt
            },
            dataType: 'json',
            success: function(response){
                $('#answer').text(response.answer);
                $('#images').empty();
                response.images.forEach(function(imageUrl){
                    $('#images').append('<img src="'+imageUrl+'">');
                });
            }
        });
    });
});

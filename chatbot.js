$(document).ready(function() {
    $('#chat-form').submit(function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        var userMessage = $('#chat-input').val().trim();
        if (userMessage !== '') {
            $('#message-container').append(`
                <div class="message user-message">
                    <div class="message-text">${userMessage}</div>
                </div>
            `);
            $('#chat-input').val('');
            scrollToBottom();

            $.ajax({
                type: 'POST',
                url: '/get_answer',
                data: formData,
                success: function(response) {
                    var botAnswer = response.answer;
                    var images = response.images;
                    var botMessage = `
                        <div class="message bot-message">
                            <div class="message-text">${botAnswer}</div>
                    `;

                    if (images && images.length > 0) {
                        var imageContainer = '<div class="image-container">';
                        for (var i = 0; i < images.length; i++) {
                            var imageUrl = images[i];
                            imageContainer += `<img src="${imageUrl}" alt="Image ${i + 1}" />`;
                        }
                        imageContainer += '</div>';
                        botMessage += imageContainer;
                    }

                    botMessage += '</div>';

                    $('#message-container').append(botMessage);
                    scrollToBottom();
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });

    $('#light-mode').on('click', function() {
        $('body').removeClass('dark-mode').addClass('light-mode');
    });

    $('#dark-mode').on('click', function() {
        $('body').removeClass('light-mode').addClass('dark-mode');
    });

    function scrollToBottom() {
        $('#message-container').scrollTop($('#message-container')[0].scrollHeight);
    }
});

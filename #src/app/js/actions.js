$(document).on('click', 'button[data-action]', function(e){
    var submitBtn = $(this);
    var data;
    switch (submitBtn.data('action')) {
        case 'status':
            data = {
                action: 'status',
                status: submitBtn.data('status'),
                user: submitBtn.data('user')
            }
            break;
        case 'tested':
            data = {
                action: 'tested',
                status: submitBtn.data('status'),
                user: submitBtn.data('user')
            }
            break;
        case 'repeat':
            data = {
                action: 'repeat',
                user: submitBtn.data('user')
            }
            break;
        default:
            return;
    }
    submitBtn.prop('disabled', true);
    $.post('/actions/',
        data,
        function (response) {
            if (response.success) {
                showMessages('info', response.message);
                if(typeof response.status !== 'undefined') {
                    $('#current_status').text(response.status);
                }
                if(typeof response.tested !== 'undefined') {
                    $('#current_tested').text(response.tested);
                }
                setTimeout(function(){
                    submitBtn.prop('disabled', false);
                }, 2000);
            } else {
                submitBtn.prop('disabled', false);
                showMessages('error', response.message);
            }
        },
        'json'
    ).fail(function () {
        submitBtn.prop('disabled', false);
        showMessages('error', 'Произошла ошибка');
    });
});
var Export = {
    processing: false,
    exportData: [],
    exportBtn: $('#export'),
    init: function () {
        var that = this;
        this.exportBtn.click(function(e){
            e.preventDefault();
            that.start();
        });
    },
    start: function() {
        this.exportBtn.prop('disabled', true);
        var that = this;
        $.post(
            '/actions/',
            {
                action: 'startExport'
            },
            function (data) {
                if (data.success) {
                    that.processing = true;
                    that.exportData = [];
                    that.exportBtn.text('Обработка...');
                    Export.process();
                } else {
                    that.finish();
                }
            },
            'json'
        ).fail(function () {
            that.finish();
        })
    },
    finish: function(error = true) {
        if (error) showMessages('error', 'Произошла ошибка');
        this.exportBtn.text('Экспорт');
        this.exportBtn.append(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M17,10 L17,8 L18,8 C19.6568542,8 21,9.34314575 21,11 L21,19 C21,20.6568542 19.6568542,22 18,22 L6,22 C4.34314575,22 3,20.6568542 3,19 L3,11 C3,9.34314575 4.34314575,8 6,8 L7,8 L7,10 L6,10 C5.44771525,10 5,10.4477153 5,11 L5,19 C5,19.5522847 5.44771525,20 6,20 L18,20 C18.5522847,20 19,19.5522847 19,19 L19,11 C19,10.4477153 18.5522847,10 18,10 L17,10 Z M10.9551845,5.95272695 L9.78361162,7.11045387 C9.37558579,7.51365754 8.71404521,7.51365754 8.30601937,7.11045387 C7.89799354,6.70725019 7.89799354,6.05352787 8.30601937,5.65032419 L12,2 L15.6939806,5.65032419 C16.1020065,6.05352787 16.1020065,6.70725019 15.6939806,7.11045387 C15.2859548,7.51365754 14.6244142,7.51365754 14.2163884,7.11045387 L13.0448155,5.95272695 L13.0448155,13.9675324 C13.0448155,14.5377485 12.5770357,15 12,15 C11.4229643,15 10.9551845,14.5377485 10.9551845,13.9675324 L10.9551845,5.95272695 Z"/>
    </svg>`)
        this.exportBtn.prop('disabled', false);
        this.processing = false;
    },
    process: function() {
        var that = this;
        if (!this.processing) return;
        $.post(
            '/actions/',
            {
                action: 'processExport'
            },
            function (data) {
                if (data.success) {
                    if (data.data.length > 0) {
                        that.exportData = that.exportData.concat(data.data);
                    }
                    if (!data.complete) {
                        that.exportBtn.text('Обработка...' + ' ' + Math.floor(data.processed / data.total * 100) + '%');
                        that.process();
                    } else {
                        that.finish(false);
                        var message = 'Экспортировано ' + data.processed + ' записей<br><br>';
                        var filename = "export.xlsx";
                        var ws_name = "Export";
                        var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(that.exportData);
                        XLSX.utils.book_append_sheet(wb, ws, ws_name);
                        XLSX.writeFile(wb, filename);
                        that.exportData = [];
                        showMessages('info', message);
                    }
                } else {
                    that.finish();
                }
            },
            'json'
        ).fail(function () {
            that.finish();
        })
    }
}
$(document).ready(function(){
    Export.init();
});

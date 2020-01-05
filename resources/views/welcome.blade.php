<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="csrf-token" content="{{ csrf_token() }}">

            <title>Sveikinimai</title>

            <!-- Fonts -->

{{--        <link href={{asset('css/app.css')}} rel="stylesheet">--}}
            <link href={{asset('css/style.css')}} rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
            <script src="https://kit.fontawesome.com/3451ecd6e5.js"></script>
            <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
        </head>
    <body>
        <div class="flex-center position-ref full-height" id="app">
            <div style="overflow: hidden" id="root"></div>
        </div>
        <script src={{asset("js/app.js")}}></script>
    </body>
</html>

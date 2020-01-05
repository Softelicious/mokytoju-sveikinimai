### Installing

Setup server with ssl enabled for facebook api ex. vagrant, then
```$xslt
composer install
```
```$xslt
php artisan key:generate
```
```$xslt
php artisan passport:install
```
```$xslt
php artisan migrate --seed
```
```$xslt
npm install
```
```$xslt
npm run dev
```

### Create admin via tinker

```$xslt
php artisan tinker
```
```$xslt
$user = new App\User
```
```$xslt
$user->name = 'admin'
```
```$xslt
$user->password = 'password'
```
```$xslt
$user->createToken('authToken')->accessToken$user->name = 'admin'
```
```$xslt
$user->save()
```

### Navigate

`login to admin`
https://app.test/admin 

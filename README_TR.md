 <h1 style="text-align: center;">
  SaaS Boilerplate Kurulum ve Kullanımı
</h1>

### Giriş
Meteor.js, MongoDB, Redis, React, Axios, Zod, Monti APM, Uniform, i18n, Tailwind and FlowBite UI kullanıyoruz.
Meteor.js 'e yaklaşımımızda bazı küçük farklılıklar var. Ancak Meteor.js'i kendi dökümantasyonundan öğrenmek katkıda bulunmaya mani değildir.

### Gereklilikler
- NVM'i kurun.
- Node.js'i kurun
- NPM'i kurun
- [Meteor.js](https://www.meteor.com/developers/install)'i kurun.
- [Docker](https://docs.docker.com/install) ve [Docker Compose](https://docs.docker.com/compose/install/) kurulmuş ve çalışır olması gerekir.

### Paketler
Proje içerisinde kullanılan önemli paketler
- alanning:roles
- jam:methods
- jam:offline
- uniforms
- universe:i18n
- zod

### Geliştirici ortamı
Geliştirici ortamı için Mongodb (replica set) ve redis.

```bash 
npm run dev-env
```
Docker imajı ayağa kalkınca uygulamayı çalıştır.
(Docker engine çalışıyor olmalı.)

```bash 
npm run start
```
Redis-oplog devredışı bırakıldıktan sonra mongodb'nin gömülü komutu olan `meteor` komutu uygulamayı çalıştırmak için kullanılabilir.

> Uygulamaya  http://localhost:3001/ adresinden erişilebilirsiniz.

Canlı ortamı simule etmek için

```bash 
npm run simulate-production
```

### Test
```bash 
npm run test
```

```bash 
npm run cypress
```

### Canlıya alma
Canlıya almak için "mup" kullanıyoruz bu nedenle .deploy dosyasını kontrol edin.

```bash 
npm run deploy
```

### APM
Monti


### Özellikler & Yol haritası
- [ ] Kullanıcı doğrulama
    - [x] Giriş
    - [x] Kayıt
    - [x] Roller
    - [x] Şifremi unuttum ile şifre yenileme
    - [x] Şifre değiştirme
    - [x] 2AD
- [x] Log kaydı
- [x] UI/UX
    - [x] Tailwind
    - [x] Flowbite react
    - [x] Mobil-öncelikli
    - [x] Responsive
    - [x] Karanlık tema
- [ ] Formlar
    - [x] Zod bridge ile çalışan Uniform
    - [x] Tailwind ile yazılmış temel form (uniform) elemanları 
    - [x] Uniform'un temel form elemanlarına dil desteği
    - [ ] Complex form components written with Tailwind
- [ ] Data grid (simple-datatables) component
  - [x] Client taraflı component
  - [ ] Server taraflı component
- [ ] Sayfalar
    - [x] Sayfa yönlendirme
    - [x] Anasayfa
    - [ ] Ödeme sayfası
    - [x] Profil sayfası
    - [x] Fiyatlar sayfası
    - [x] Yardım / destek sayfası
- [ ] Yönetim
    - [x] Kullanıcı yönetimi
    - [x] Rol yönetimi
    - [ ] Lisans yönetimi
    - [ ] Organizasyon yönetimi
    - [ ] Headless CMS entegrasyonu
    - [x] RSS Okuyucu
- [ ] Database
    - [x] Tamamen soft-remove
    - [ ] Multi-tenant database partitioning
- [ ] Altyapı
    - [x] Decoupled modül yapısı
    - [x] Axios entegrasyonu
    - [ ] Swagger entegrasyonu
    - [x] Cron job modülü
    - [x] Eposta modülü
    - [x] Migration modülü
    - [x] MontiAPM ile performans takibi
    - [x] AWS s3 entegrasyonu
    - [x] PWA
    - [x] Çok dil desteği
- [ ] Methodlar
    - [x] Zod şemalarıyla valide edilmiş methodlar
    - [ ] CQRS (Command ve Query buses)

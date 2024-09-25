 <h1 style="text-align: center;">
  SaaS Boilerplate Kurulum ve Kullanımı
</h1>

### Giriş
Meteor.js, MongoDB, Redis, React, Axios, Zod, Monti APM, Uniform, i18n, Tailwind and FlowBite UI kullanıyoruz.
Meteor.js 'e yaklaşımımızda bazı küçük farklılıklar var. Ancak Meteor.js'i kendi dökümantasyonundan öğrenmek katkıda bulunmaya mani değildir.

### Gereklilikler
- NVM'i kurun.
- Node.js'i kurun ( versiyon 14.x'den yüksek versiyonlar desteklenmemektedir.).
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

### Roadmap
- [x] Giriş
- [x] Kayıt
- [x] Roller
- [x] Log
- [ ] Şifre kurtarma
- [x] Hesap yönetimi
- [x] Şifre değiştirme
- [x] 2AD
- [x] Karanlık tema
- [x] Sayfalar arası geçiş
- [x] Zod köprülü uniform
- [x] Tailwind ile yazılmış basit form elemanları
- [x] Fiyatlar sayfası
- [ ] Ödeme sayfası
- [ ] Lisans yönetimi
- [ ] Multi-tenant database partitioning
- [x] Soft-remove
- [ ] Organizasyon yönetimi
- [ ] Kullanıcı yönetimi
- [ ] Destek sayfası
- [ ] Headless CMS entegrasyonu
- [x] RSS gösterimi
- [x] AWS s3 entegrasyonu
- [ ] Zamanlanmış görevler
- [x] MontiAPM ile performans takibi
- [x] Axios kullanımı
- [ ] Swagger implementation
- [x] PWA

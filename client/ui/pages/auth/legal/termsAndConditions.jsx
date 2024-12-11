import React from 'react';

const TermsAndConditions = () => {
  const {name} = Meteor.settings.public.app;
  const company = Meteor.settings.public.company;

  return (
    <>
      <h1>1. Sözleşme’nin Tarafları</h1>
      <p>{name} Uygulaması Üyelik Sözleşmesi (“Sözleşme”), merkezi {company.address} adresinde bulunan, {company.registrationOffice}’ne {company.registrationId} sicil numarası ile kayıtlı, {company.mersis} MERSİS numaralı ve {company.taxOffice}’ne {company.taxId} vergi numarasıyla kayıtlı {company.name} (“Şirket”) ile Şirketimize ait {company.website} Android veya IOS uygulamaları (“Çevrimiçi Kanallar”) üzerinden {name} uygulamasına (“Uygulama”) üye olan kullanıcı ("Üye") arasında akdedilmiştir.</p>
      <p>Sözleşme, Üye’nin, üyelik formunu doldurması veya sosyal medya ağları üyeliği aracılığıyla “Uygulama Üyelik Sözleşmesi’ni okudum ve kabul ediyorum” seçeneğini tıklayarak Sözleşme şartlarını onayladığı anda yürürlüğe girecektir.</p>
      <p>Bundan sonra Şirket ve Üye tek başına “Taraf”, birlikte “Taraflar” olarak anılacaktır.</p>
      <h1>2. Sözleşme’nin Konusu</h1>
      <p>Sözleşme’nin konusu, Üye’nin oluşturduğu Uygulama hesabı ile Çevrimiçi Kanallar üzerinden yalnızca Şirketimiz tarafından Uygulama markası ile işletilen kafeler içerisinde satılan/menüde yer alan kahve veya diğer ürünleri online veya kafede öde yöntemleri ile satın alma, aynı yöntemler ile Üye’nin belirleyeceği arkadaşlarına hediye kahve satın alma, Şirket tarafından zaman zaman düzenlenen çeşitli kampanyalar kapsamında bedava kahve hakkından veya Şirket tarafından belirlenen diğer haklardan yararlanma koşullarının belirlenmesidir. Üye, Çevrimiçi Kanallar üzerinden sipariş vermesi halinde istediği sipariş içeriğini tek tıkla tanımlama, hızlı sipariş verilebilmesi ile sipariş geçmişinin kaydedilmesi, hediye kahve veya ürünlerden faydalanma ve Şirket tarafından düzenlenen kampanyalara katılma gibi avantajlardan yararlanacaktır.</p>
      <h1>3. Üyelik Bilgileri</h1>
      <p>3.1. Her Üye, e-posta adresi ile kendisinin belirleyeceği bir şifreye sahip olur.</p>
      <p>3.2. Şifre sadece Üye’nin bilgisi dâhilindedir. Üye’nin şifresini unutması halinde, Şirket, talep üzerine Üye’nin kayıtlı e-posta adresine yeni şifre oluşturabilmek için bir bağlantı gönderecektir. Şifrenin belirlenmesi ve korunması tamamıyla Üye’nin kendi sorumluluğundadır ve Şirket şifre kullanımından doğacak problemlerden veya oluşabilecek zararlardan kesinlikle sorumlu değildir.</p>
      <p>3.3. Üye, Çevrimiçi Kanallar’dan yararlanması için Üye (kullanıcı) adı ve/veya şifresini başkası ile paylaşmamayı, başkasına kullandırmamayı ve bu bilgilerini güvenli bir şekilde saklamakla sorumlu olduğunu kabul ve taahhüt eder. Bu kapsamda Üye şifresini güçlü bir karakter dizisinden oluşturmalıdır. Üye oluşturduğu şifresinin aynısını başka bir uygulama veya internet sitesinde kullanmamaya özen göstermelidir. Üye, üyelik şifresinin Üye’nin kendi kusuruyla başkalarının eline geçmesi, üyeliğin kötüye kullanılması veya suiistimal edilmesi, paylaşılan bilgilerin doğru ve güncel olmaması ve bunun gibi hallerde Şirket tarafından üyeliğin iptal edilebileceğini, üyeliğe ilişkin hakların geri alınabileceğini ve tüm yasal sorumluluğun kendisine ait olacağını kabul ve taahhüt eder. Şirket’in bu gibi durumlara ilişkin olarak herhangi bir sorumluluğu ve/veya Üye’nin zararlarını tazmin etme yükümlülüğü bulunmamaktadır.</p>
      <p>3.4. Üye olma aşamasında Üye’nin telefon numarasına doğrulama kodu gönderilmesi suretiyle, Üye telefon numarası teyit edilmektedir.</p>
      <h1>4. Üye’nin Hak ve Yükümlülükleri</h1>
      <p>4.1. Üye, Çevrimiçi Kanallar’ı kullanırken mevzuat hükümleri ile Sözleşme şartlarına uymayı ve söz konusu hükümleri ihlal etmemeyi kabul ve taahhüt eder. Aksi durumda, oluşacak tüm hukuki ve cezai yaptırımlardan tamamen ve münhasıran Üye sorumlu olacaktır.</p>
      <p>4.2. Üye, Sözleşme’yi kabul ederek 18 yaşından büyük olduğunu beyan etmektedir. Üye’nin 18 yaşından küçük olduğunun anlaşılması halinde Sözleşme bildirime gerek olmaksızın derhal fesih edilir ve üyelik iptal edilir. 18 yaşından büyük olduğunu beyan ederek Sözleşme akdetmiş olan kişinin uğrayacağı herhangi bir zarardan Şirket sorumlu tutulamayacaktır.</p>
      <p>4.3. Üye, Çevrimiçi Kanallar’a üye olurken verdiği kişisel ve sair bilgilerin gerçeğe uygun ve doğru olduğunu; üyelik bilgilerinde herhangi bir değişiklik meydana gelirse bilgilerini güncelleyeceğini kabul, beyan ve taahhüt eder. Üye, üyelik bilgilerini güncellemek isterse profil sayfasından gerekli işlemleri yapabilir, üyelikten ayrılmak isterse Uygulama içerisinde yer alan “Geri Bildirimde Bulunun” bölümünden üyelikten ayrılmak istediğini belirtebilir veya taleplerini [●]’yi arayarak da iletebilecektir.</p>
      <p>4.4. Üye, Çevrimiçi Kanallar’da başkalarının hizmetleri kullanmasını önleyici veya zorlaştırıcı faaliyet (spam, virüs, vb.) ve işlemlerde bulunamaz.</p>
      <p>4.5. Üye, Çevrimiçi Kanallar’ı hiçbir şekilde kamu düzenini bozucu, genel ahlaka aykırı, başkalarını rahatsız ve taciz edici şekilde, başkalarının fikri ve telif haklarına tecavüz edecek şekilde ve yasalara aykırı herhangi bir amaç için kullanamaz. Üye, başkalarına ait kişisel verileri kayıt etmemeyi, yaymamayı, kötüye kullanmamayı, başka kullanıcıların bilgilerine ve yazılımlarına izinsiz olarak ulaşmamayı kabul eder. Aksi halde, bu nedenle doğacak hukuki ve cezai sorumluluk tamamen Üye’ye aittir.</p>
      <p>4.6. Üye, Uygulama üzerinde verilen tüm siparişlerin, yapılan tüm alışverişlerin kişisel kullanım amaçlı olduğunu, bunların tekrar satış amaçlı olmadığını kabul, beyan ve taahhüt eder.</p>
      <p>4.7. Sözleşme içerisinde sayılan maddelerden bir ya da birkaçını ihlal eden Üye, bu nedenle doğabilecek tüm zararlardan sorumlu olacağını ve Şirket’i bu nedenle ortaya çıkabilecek tüm zarar, dava, talep ve iddialardan ari tutacağını ve bunlara karşı tazmin edeceğini kabul ve taahhüt eder.</p>
      <h1>5. Şirket’in Hak ve Yükümlülükleri</h1>
      <p>5.1. Fiyatlar ve sunulan ürün ve hizmetler üzerinde değişiklik yapma hakkını her zaman saklı tutar.</p>
      <p>5.2. Çevrimiçi Kanallar’da Üye tarafından beyan edilen, yazılan fikir ve düşünceler ve kullanılan ifadeler münhasıran Üye’nin kendi kişisel fikir ve yorumları olup, bu fikir ve yorumların sonuçlarından yalnızca Üye sorumludur.</p>
      <p>5.3. Çevrimiçi Kanallar’ın tasarım ve yazılımı ile ürünlere ait metin ve görsel içeriklere ilişkin tüm fikri mülkiyet hakları Şirket’in mülkiyetinde olup, bunlar Üye tarafından Şirket’in yazılı izni olmaksızın kullanılamaz.</p>
      <p>5.4. Şirket tarafından Çevrimiçi Kanallar’ın iyileştirilmesine ve geliştirilmesine yönelik olarak ve/veya mevzuat çerçevesinde Uygulama’ya erişmek için kullanılan internet servis sağlayıcısının adı ve Internet Protokol (IP) adresi, cihaz bilgisi, Uygulama’ya erişilen tarih ve saat, Uygulama’da bulunulan sırada erişilen sayfalar (ürün menüsü, profilim vb.) gibi birtakım bilgiler toplanabilir.</p>
      <p>5.5. Şirket,</p>
      <ul>
        <li>(i) Üyelerine daha iyi hizmet sunmak,</li>
        <li>(ii) hizmetlerini ve ürünlerini iyileştirmek,</li>
        <li>(iii) Çevrimiçi Kanallar’ın kullanımını kolaylaştırmak ve</li>
        <li>(iv) hizmetlerini ve Çevrimiçi Kanallar’ın kullanımını Üye’lerinin ilgi alanlarına ve tercihlerine yönelik olarak değiştirmek amaçlarıyla çerez (cookie) kullanmaktadır. Çerez politikasına buradan ulaşabilirsiniz. Çerez kullanılmasına ilişkin tercihler profil ayarlarından değiştirilebilecektir. Şirket, Üye’nin Çevrimiçi Kanallar üzerinde yaptığı işlemlerin kaydını bulundurma hakkını saklı tutar.</li>
      </ul>
      <p>5.6. Şirket Çevrimiçi Kanallar vasıtasıyla üye olurken “KVKK uyarınca kişisel verilerimin Açık Rıza Metni’nde belirtilen hususlar kapsamında işlenmesini ve aktarılmasını, ETK uyarınca tarafıma ticari elektronik ileti gönderilmesine onay verdiğimi kabul ediyorum.” seçeneğini onaylayarak işaretlemiş olan Üye’ler seçtikleri iletişim kanalı (SMS, e-posta, çağrı) ile kendileriyle iletişime geçilmesine izin vermektedir. Kendisiyle ticari ileti gönderilmesi suretiyle iletişime geçilmesine izin veren Üye dilediği zaman bu iznini geri çekebilecektir.</p>
      <p>5.7. Şirket, Uygulama Üyelik Sözleşmesi ile Çevrimiçi Kanallar’da değişiklik haklarını saklı tutar. Çevrimiçi Kanallar’da herhangi bir değişiklik olup olmadığını kontrol etme yükümlülüğü Üye’ye aittir.</p>
      <p>6. Kişisel Verilerin Korunması</p>
      <p>6.1. Şirket’in faaliyetleri kapsamında Kişisel Verilerin Korunması mevzuatı uyarınca hazırlanan aydınlatma metnine uygulamaya “Üye Ol” kısmından erişim sağlanabilecektir.</p>
      <p>6.2. Üye’nin Çevrimiçi Kanallar’da yer alan verilerinin güvenliği için Şirket tarafından gerekli teknik tedbirler alınmış olmakla birlikte, söz konusu veriler Üye’nin cihazı vasıtasıyla temin edildiği için ilgili verilerin Üye tarafından korunması ve ilgisiz kişilerce erişilmemesi için gerekli tedbirlerin alınmasına ilişkin Üye’nin sorumluluğu bulunmaktadır.</p>
      <h1>7. Sözleşmenin Feshi</h1>
      <p>Üye profil sayfasından gerekli işlemleri yaparak, {company.email.main} adresine yazılı olarak bildirmek veya {company.phone}’yi aramak kaydıyla Sözleşme’yi feshederek üyeliğini dilediği zaman sona erdirebilir. Yazılı veya sözlü bildirimin Şirket’e ulaştığı tarihte Sözleşme sona erer ve Şirket, üyelik kaydını siler. Aynı şekilde Şirket de çeşitli nedenler ile üyelikleri askıya alabilir/sona erdirebilir.</p>
      <h1>8. Uygulanacak Hukuk ve Yetkili Mahkeme ve İcra Daireleri</h1>
      <p>8.1. Şikayet ve itiraz konusunda başvurular Üye’nin veya ikametgâhının bulunduğu veya işlemin yapıldığı yerdeki Tüketici Hakem Heyetine veya yetkili Tüketici Mahkemesine yapılabilecektir.</p>
      <p>8.2. Sözleşme kapsamında Taraflar arasında çıkabilecek her türlü uyuşmazlığın çözüm yeri olarak İstanbul Adliyesi Mahkemeleri ve İcra Daireleri ile hakem heyeti veya tüketici mahkemeleri görevli ve yetkili olacaktır.</p>
    </>
  );
};

export default TermsAndConditions;

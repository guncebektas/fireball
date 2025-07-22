import React from 'react';
import {H2, H3} from "../../../components/heading/Headings";

export const PrivacyPolicy = ({fullPage}) => {
  const {name} = Meteor.settings.public.app;
  const company = Meteor.settings.public.company;
  const title = 'PrivacyPolicy';

  return (
    <>
      {fullPage && (
        <H2 text={title}/>
      )}

      <div className="text-lg text-gray-500 space-y-6 mb-8">
        <H3 text="1. Veri Sorumlusunun Kimliği"/>

        <p>{company.name} (“Şirket”) olarak {name} Uygulaması üzerinden (“Uygulama”) ürün ve hizmetlerimizi en iyi şekilde sunabilmek bizim için büyük önem arz etmektedir. Bu doğrultuda veri sorumlusu sıfatıyla elde ettiğimiz kişisel verilerinize ilişkin olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) kapsamında sizleri bilgilendirmek istiyoruz.</p>

        <H3 text="2. Kişisel Verilerin İşlenmesi ve İşleme Amaçları"/>
        <p>Kişisel verileriniz, Şirketimiz tarafından sunulan ürün, hizmet ya da ticari faaliyete ilişkin olarak değişkenlik gösterebilmekle beraber, Şirketimiz ürün ve hizmetlerinin en iyi şekilde sunulabilmesini sağlamak maksadıyla işlenmektedir. Şirketimizin işlemekte olduğu kişisel veriler ve işleme amaçları şu şekildedir:</p>

        <p>Kimlik verileriniz (isim, soyisim) iletişim verileriniz (telefon, e-posta) müşteri işlem verileriniz (sipariş bilgisi) Uygulama'ya üye olmayı tercih etmeniz halinde; Uygulama üyeliğinizin yapılması,
          tarafınıza ücretsiz kahve ikram edilebilmesi, Arkadaşlarınıza hediye kahve satın alabilmeniz,
          {company.name} markası ile işletilen kafelerimizi ve franchiselarımızı ziyaretiniz sırasında veya Çevrimiçi Kanallar (Android veya IOS uygulamaları) ürün ve/veya hizmetlerimizin sunulması,
          siparişlerinizin alımı ve iptali işlemlerinin yönetilmesi, izin vermeniz halinde konum veriniz size en yakın {company.name} markası ile işletilen kafelerimizi ve franchiselarımızı görüntülenebilmesi,
        </p>
        <p>Fiziksel mekan güvenliği verileriniz (kamera kayıtları) siparişinizi teslim almak için {company.name} markası ile işletilen kafelerimizi ve franchiselarımızı ziyaret etmeniz halinde fiziksel mekan güvenliğinin sağlanabilmesi,</p>
        <p>Müşteri işlem verileriniz (çağrı merkezi kayıtları) Çağrı Merkezi vasıtasıyla gerçekleştirilen telefon görüşmelerinin kalitesinin ölçülmesi ve değerlendirilmesi, öneri, talep ve şikayetleriniz alınması, takip edilmesi ve sonuçlandırılması,</p>
        <p>İşlem güvenliği verileriniz (log kayıtları, IP adresi) • Çevrimiçi Kanallar (Android veya IOS uygulamaları) ürün ve/veya hizmetlerimizin sunulması,
          internet sitemizi ziyaret etmeniz veya {company.name} markası ile işletilen kafelerimiz tarafından ücretsiz sağlanan kablosuz ağ sistemine giriş yapmanız halinde veya Uygulamayı kullanmanız durumunda 5651 sayılı Kanun gereğince elektronik ortamda oluşan log kayıtlarının işlem güvenliği amacıyla tutulması,
          mobil uygulamamızdan en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminin geliştirilmesi için çerez kullanılması (talebe bağlı olarak çerez kullanımına ilişkin ayarlardan değiştirilebilmektedir.),</p>
        <p>Açık rızanızın bulunması halinde, isim, soyisim, telefon, e-posta, müşteri işlem, pazarlama verileriniz müşteri veritabanımızın oluşturulabilmesi, Uygulama hizmet ve ürün kalitesinin geliştirilmesi, firma/ürün/hizmetlere bağlılık süreçlerinin yürütülmesi ve müşteri memnuniyetinin sağlanması için sosyal medya platformları ve Çevrimiçi Kanallar vasıtasıyla ürün ve hizmetlerin tanıtımı, promosyon, anket, çekiliş, hediye gönderimi, bilgilendirme, yarışma, kampanya ve reklam faaliyetlerinin gerçekleştirilmesi, genel ve özel teklifler sunulması dahil pazarlama süreçlerinin yürütülmesi, müşterilerin olası taleplerinin önceden öngörülebilmesi amacıyla analiz, hedefleme, segmentasyon çalışmalarının gerçekleştirilmesi ile ayrıca pazarlama faaliyetlerimize ilişkin olarak ticari elektronik ileti izninizin bulunması halinde iletişim faaliyetlerinin yürütülmesi ve</p>
        <p>ayrıca, yukarıda belirtilen kimlik, iletişim, müşteri işlem, izin vermeniz halinde konum, fiziksel mekan güvenliği ve işlem güvenliği verileriniz; bilgi ve veri güvenliğinin temini, bilgi sistemlerinin sürekliliğinin sağlanması, resmi kurum ve kuruluşların taleplerinin yerine getirilmesi ve Şirketimize iletilen kararların uygulanması, arşiv ve saklama süreçlerinin yürütülmesi, ürünlerimizin ve hizmetlerimizin iyileştirilmesi için gerekli çalışmaların yürütülmesi, raporlama, analiz, iç kontrol, denetim, inceleme, soruşturma çalışmalarının yapılması, Şirketimizin faaliyetlerinin yürütülmesi, geliştirilmesi, mevzuata ve Şirket ile Şirket’in bağlı olduğu DP Eurasia N.V. global politika ve prosedürlerine uyum sağlanması amaçlarıyla sınırlı olarak işlenebilecektir.</p>
        <p>Siparişlerinizde “{company.name}’den Teslim Al” seçeneğini tercih etmemeniz halinde siparişiniz seçiminize istinaden Yemeksepeti Vale veya Getir Yemek uygulamaları ile tarafınıza teslim edilecektir. Sipariş teslimi Şirket’imiz ile bir ilişkisi olmayan eve servis hizmeti veren çevrimiçi uygulamalar vasıtasıyla tarafınıza teslim edileceği için adres verinizi işlememekteyiz.</p>

        <H3 text="3. Kişisel Verilerin Aktarılması"/>
        <p>Toplanan kişisel verileriniz, Aydınlatma Metni’nin 2. maddesinde açıklanan amaçlarla Kanun ve ilgili düzenlemeler kapsamında aktarılmasını gerektiren sebeple sınırlı olarak Şirketimizin hizmetlerinden faydalandığı ve işbirliği içerisinde olduğu reklam ajanslarına, çağrı merkezine, arşiv şirketine, telekomünikasyon şirketine, denetçilerimize, hukuk müşavirleri dahil olmak üzere danışmanlık aldığımız firmalara, gerekmesi halinde yetkili kamu kurum ve kuruluşlarına, Şirketimizin ve Şirketimizin bağlı bulunduğu grup şirketlerinin global bilgi güvenliği stratejilerine uygun olarak sunucularının yer aldığı yurt içinde ve yurt dışında bulunan bilgi teknoloji hizmeti sunan firmalara aktarılabilecektir.</p>

        <H3 text="4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi"/>
        <p>Kişisel verileriniz yukarıda belirtilen amaçlarla, Kanun’da öngörülen temel ilkelere uygun ve Kanun’un 5. maddesinin 2. fıkrasında belirtilen sözleşmenin ifası, hukuki yükümlülüğün yerine getirilmesi, kanunlarda açıkça öngörülmesi, veri sorumlusunun meşru menfaati ve açık rızanızın bulunması hukuki sebeplerine dayalı ve bu sebeplerle sınırlı olarak, otomatik veya otomatik olmayan yöntemlerle, fiziken ve elektronik ortamda, tarafınızca Şirketimize Çevrimiçi Kanallar, e-posta, telefon/çağrı merkezi vasıtasıyla iletilen sözlü veya yazılı bilgilerden, sosyal medya platformlarından, ajanslardan, çerezlerden, şubelerimiz ve franchiselarımız, resmi kurum ve kuruluşlardan (Tüketici Hakem Heyeti vs.), destek hizmetleri alınan iş ortaklarından, kamera kayıtları aracılığıyla ve Şirket faaliyetleri kapsamında kullanılan uygulama ve yazılımlar ile toplanabilmektedir.</p>

        <H3 text="5. Kişisel Verileriniz Konusundaki Haklarınız"/>
        <p>Kanun kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme; işlenme amacını ve tarafımızca bu amaçlara uygun olarak kullanıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme; eksik veya yanlış işlenmiş olması halinde düzeltilmesini talep etme; işlenmesini gerektiren sebeplerin ortadan kalkması halinde silinmesini veya yok edilmesini ya da anonim hale getirilmesini talep etme; bu hallerde ya da düzeltme halinde bunların veri aktarılan üçüncü kişilere bildirilmesini isteme; işlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıktığını düşünüyorsanız bu duruma itiraz etme; kanuna aykırı olarak işlenmesi sebebiyle bir zarara uğramanız halinde bu zararın giderilmesini talep etme; haklarınızın olduğunu da hatırlatmak isteriz.</p>
        <p>Kanun kapsamında, kişisel verilerinizle ilgili başvurularınızı {company.website} adresinde yer alan “Kişisel Veri Sahibi Başvuru Formu” ile aşağıda belirtilen kanallardan birini kullanarak;</p>
        <ul>
          <li>{company.address} adresine kimlik teyidinizin yapılması sağlanarak bizzat; veya</li>
          <li>Şirket’in kayıtlı elektronik posta adresine (KEP) ({company.email.kep}); veya</li>
          <li>Güvenli elektronik veya mobil imzanız ile Şirketimizin {company.email.main} adresine; veya</li>
          <li>Kimlik teyidinizin yapılması sağlanarak, KVK Kanunu ve ilgili mevzuatta belirtilen diğer usuller ile tarafımıza iletebilirsiniz.</li>
        </ul>
        <p>Şirket, Kanun’un 13. maddesine uygun olarak, başvuru taleplerini, talebin niteliğine göre ve en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandıracaktır. Talebin reddedilmesi halinde, ret nedeni/nedenleri yazılı olarak veya elektronik ortamda gerekçelendirilir. İşlemin maliyet gerektirmesi halinde, KVK Kurulu tarafından belirlenen tarife uygulanacaktır.</p>
      </div>
    </>
  );
};

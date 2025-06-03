import React from "react";
import {Accordion} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";
import {useTracker} from "meteor/react-meteor-data";
import {faqModule} from "../../../../imports/modules/app/faqs/faqModule";
import {H2} from "../../components/heading/Headings";

export const Faqs = ({showTitle = true}) => {
  const t = useTranslator();

  const _module = faqModule;
  const columns = [
    {key: 'order'},
    {key: 'question'},
    {key: 'answer'}
  ];

  const defaultItems = [{
    question: 'Nasıl üye olabilirim?',
    answer: 'E-posta adresinizi kullanarak kayıt sayfasındaki formu doldurmanız uygulamamıza kayıt olmanız için yeterli. Kayıt olup eşsiz lezzetlerimizin keşfine çıkabilirsiniz.',
  }, {
    question: 'Şubeye nasıl sipariş verebilirim?',
    answer: 'Şubeler sayfasından seçimini yaptığınız şubenin menüsünü açıp, sipariş vermek istediğiniz ürünleri sepetinize ekleyebilirsiniz. Siparişinizi kredi kartınızı ya da cüzdan özelliğini kullanarak uygulama içerisinden ödeyebileceğiniz gibi kredi kartınızla ya da nakit olarak kasada da ödeyebilirsiniz',
  }, {
    question: 'Uygulamadan verdiğim siparişi nasıl teslim alabilirim?',
    answer: 'Ödemeyi tamamladıktan sonra siparişin hazırlanmaya başlanacak. Seçtiğin şubeye gidip sipariş numaranızı ve isminizi söyleyerek siparişinizi teslim alabilirsiniz.'
  }, {
    question: 'Nasıl yıldız kazanabilirim?',
    answer: 'Uygulama içerisinden yaptığınız ödemeler sonrasında otomatik olarak, kasada yaptığınız ödemelerde ise QR kodunuzu okutarak yıldız kazanabilirsiniz.'
  }, {
    question: 'Kazandığım yıldızları nasıl kullanabilirim?',
    answer: 'Ödeme yapmadan önce kasaya yıldız kullanmak istediğinizi belirtmeniz yeterli.'
  }, {
    question: 'Yıldız kullanarak aldığım ürünleri kişiselleştirebilir miyim?',
    answer: 'Elbette! Ekstra şurup, çikolata, süt tercihi gibi ilave isteklerin ayrıca ücretlendirilir.'
  }, {
    question: 'Kazı kazan nedir?',
    answer: 'Haftada bir kez kazı kazan kartı ile ücretsiz yıldız kazanabilirsiniz.'
  }, {
    question: 'Siparişimi iptal edebilir miyim?',
    answer: 'Ödemesi tamamlanan siparişler hazırlanmaya başlanacağı için sipariş iptalinde bulunamazsınız.'
  }, {
    question: 'Ödemesini yaptığım bir sipariş işletme tarafından iptal edildi. Paramı nasıl geri alabilirim?',
    answer: 'Siparişinizin hazırlanmasının mümkün olmadığı durumlarda, geri ödemeniz 7-10 gün içerisinde gerçekteleşecektir.'
  }, {
    question: 'Cüzdan\'daki bakiyemi geri alabilir miyim?',
    answer: 'Evet, müşteri hizmetleri ile iletişime geçerek, uygulamaya kayıt olduğunuz e-posta adresi ile yükleme yaptığın kartın son dört hanesini müşteri temsilcimizle paylaşarak iade talebinde bulunabilirsiniz. İade işlemlerinin gerçekleşmesi bankanıza bağlı olarak 7-10 gün içerisinde gerçekleşecektir.'
  }, {
    question: 'Cüzdan\'ımdaki bakiyeyi başka bir yerde kullanabilir miyim?',
    answer: 'Cüzdan ve kampanya koşulları dahilinde kazanılan bakiyeler sadece uygulama içerisinden yapılan alışverişlerde kullanılabilmektedir. Kazanımlar ve bakiyeler başka bir kullanıcıya devredilememektedir.'
  }]

  const {items, loading} = useTracker(() => {
    const handle = Meteor.subscribe(_module.publisher.ALL_ONCE, columns);
    return {
      loading: !handle.ready(),
      items: handle.ready() ? _module.repository.find({}, {sort: {order: 1}}).fetch() : []
    };
  });

  return (
    <>
      {showTitle ? <div className="mb-3"><H2 text={t('FAQs')} showBackButton={true}/></div> : ''}
        <Accordion>
          {defaultItems.map((faq, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                {faq.question}
              </Accordion.Title>
              <Accordion.Content>
                <p className="m-text">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Panel>
          ))}

          {items.map((faq, index) => (
            <Accordion.Panel key={index}>
              <Accordion.Title>
                {faq.question}
              </Accordion.Title>
              <Accordion.Content>
                <p className="m-text">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
    </>
  );
};

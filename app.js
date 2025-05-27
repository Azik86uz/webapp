document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("requestForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const phone = document.getElementById("phone").value.replace(/\s/g, '');
    const services = Array.from(document.querySelectorAll('input[name="service"]:checked'))
                          .map(cb => cb.value);

    if (!name || !age || phone.length !== 9 || services.length === 0) {
      alert("Пожалуйста, заполните все поля и выберите услугу.");
      return;
    }

    const message = `📝 Новая заявка:\n👶 Имя: ${name}\n🎂 Возраст: ${age}\n📞 Телефон: +998${phone}\n💆 Услуги:\n- ${services.join('\n- ')}`;

    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(message);
    }

    alert("✅ Заявка отправлена!");
    form.reset();
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleServices');
    const servicesList = document.getElementById('servicesList');
    const showFormBtn = document.getElementById('showFormBtn');
    const requestForm = document.getElementById('requestForm');
    const phoneInput = document.getElementById('phone');

    let servicesVisible = false;
    let selectedServices = [];

    toggleBtn.addEventListener('click', function() {
        servicesVisible = !servicesVisible;
        servicesList.style.display = servicesVisible ? 'block' : 'none';
        this.innerHTML = servicesVisible 
            ? 'Скрыть список услуг ▲' 
            : 'Посмотреть список услуг ▼';
    });

    document.querySelectorAll('input[name="service"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedServices.push(this.parentElement.textContent.trim());
            } else {
                selectedServices = selectedServices.filter(
                    service => service !== this.parentElement.textContent.trim()
                );
            }
            showFormBtn.disabled = selectedServices.length === 0;
        });
    });

    showFormBtn.addEventListener('click', function() {
        requestForm.style.display = 'block';
        this.style.display = 'none';
    });

    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        let formatted = '';

        if (value.length > 0) {
            if (value.length <= 2) {
                formatted = value;
            } else if (value.length <= 5) {
                formatted = value.substring(0, 2) + ' ' + value.substring(2);
            } else if (value.length <= 7) {
                formatted = value.substring(0, 2) + ' ' +
                           value.substring(2, 5) + ' ' +
                           value.substring(5);
            } else {
                formatted = value.substring(0, 2) + ' ' +
                           value.substring(2, 5) + ' ' +
                           value.substring(5, 7) + ' ' +
                           value.substring(7, 9);
            }
        }

        this.value = formatted;
    });

    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputs = requestForm.querySelectorAll('input');
        const name = inputs[0].value.trim();
        const age = inputs[1].value.trim();
        const phone = phoneInput.value.replace(/\s/g, '');

        if (phone.length !== 9 || !/^\d+$/.test(phone)) {
            alert('Пожалуйста, введите корректный номер телефона (например: 90 123 45 67)');
            return;
        }

        if (selectedServices.length === 0) {
            alert('Пожалуйста, выберите хотя бы одну услугу');
            return;
        }

        // 📨 Формируем сообщение
        const message = `📝 Новая заявка:\n👶 Имя: ${name}\n🎂 Возраст: ${age}\n📞 Телефон: +998${phone}\n💆 Услуги:\n- ${selectedServices.join('\n- ')}`;

        // 🔄 Отправка данных в Telegram через WebApp
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.sendData(message);
        }

        // ✅ Визуальное подтверждение
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');

        this.reset();
        this.style.display = 'none';
        showFormBtn.style.display = 'block';
        document.querySelectorAll('input[name="service"]:checked').forEach(cb => cb.checked = false);
        selectedServices = [];
        servicesList.style.display = 'none';
        toggleBtn.innerHTML = 'Посмотреть список услуг ▼';
        servicesVisible = false;
    });
});

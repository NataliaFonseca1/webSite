document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('form')) {
        document.getElementById('form').addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const sobrenome = document.getElementById('sobrenome').value.trim();
            const email = document.getElementById('email').value.trim();
            const idade = parseInt(document.getElementById('idade').value, 10);

            console.log(nome, sobrenome, email, idade);
            
            if (nome.length < 3 || nome.length > 50) {
                alert('O campo nome deve ter entre 3 e 50 caracteres.');
                return;
            }
            if (sobrenome.length < 3 || sobrenome.length > 50) {
                alert('O campo sobrenome deve ter entre 3 e 50 caracteres.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            if (isNaN(idade) || idade <= 0 || idade >= 120) {
                alert('A idade deve ser um número positivo e menor que 120.');
                return;
            }

            const formData = { nome, sobrenome, email, idade };
            localStorage.setItem('formData', JSON.stringify(formData));

            window.location.href = 'confirmation.html';
        });
    }

    if (document.getElementById('dados-confirmacao')) {
        const formData = JSON.parse(localStorage.getItem('formData'));

        if (formData) {
            document.getElementById('dados-confirmacao').innerHTML = `
                <p><strong>Nome:</strong> ${formData.nome}</p>
                <p><strong>Sobrenome:</strong> ${formData.sobrenome}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Idade:</strong> ${formData.idade}</p>
            `;
        } else {
            document.getElementById('dados-confirmacao').innerHTML = `<p>Erro: Nenhum dado encontrado.</p>`;
        }

        document.getElementById('confirmar').addEventListener('click', function () {
            if (formData) {
                const jsonString = JSON.stringify(formData, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });

                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'data.json';
                a.click();

                window.location.href = 'index.html';
            }
        });
    }
});

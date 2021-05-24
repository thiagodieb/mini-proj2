const urlBase = "https://mtsiw.duckdns.org/pwa";
let isNew = true;

window.onload = () => {
    // References to HTML objects   
    const tblSpeakers = document.getElementById("tblSpeakers");
    const frmSpeaker = document.getElementById("frmSpeaker");

    frmSpeaker.addEventListener("reset", (event) => {
        isNew = true;
    });

    frmSpeaker.addEventListener("submit", async (event) => {
        event.preventDefault();
        const txtName = document.getElementById("txtName").value;
        const txtJob = document.getElementById("txt").value;
        const txtPhoto = document.getElementById("txtNivel").value;

        try {
        
            let result = await response.json();

            if (result.success == true) {
                frmSpeaker.reset();

                Swal.fire({
                    title: 'Sucesso',
                    text: result.message.pt,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Fechar'
                });
            } else {
                Swal.fire({
                    title: 'Erro',
                    text: result.message.pt,
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Fechar'
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Erro!',
                text: err,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Fechar'
            });
        }

        renderSpeakers();
    })

    const renderSpeakers = async () => {
        let strHtml = `
            <thead >
                <tr><th class='w-100 text-center bg-warning' colspan='4'>Lista de Oradores</th></tr>
                <tr class='bg-info'>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Cargo</th>              
                    <th class="text-right">Ações</th>              
                </tr> 
            </thead><tbody>
        `
        const response = await fetch(`${urlBase}/speakers`)
        const speakers = await response.json()
        let i = 1
        for (const speaker of speakers) {
            strHtml += `
                <tr>
                    <td>${i}</td>
                    <td>${speaker.nome}</td>
                    <td>${speaker.cargo}</td>
                    <td class="text-right">
                        <i id='edit-${speaker.idSpeaker}' idspeaker='${speaker.idSpeaker}' class='fas fa-edit edit as-button'></i>
                        <i id='remove-${speaker.idSpeaker}' idspeaker='${speaker.idSpeaker}' class='fas fa-trash-alt remove as-button'></i>
                    </td>
                </tr>
            `
            i++
        }
        strHtml += "</tbody>"
        tblSpeakers.innerHTML = strHtml

        // Gerir o clique no ícone de Editar        
        const btnEdit = document.getElementsByClassName("edit")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", function () {
                isNew = false;
                let idSpeaker = this.getAttribute('idspeaker');
                for (const speaker of speakers) {

                }
            })
        }

        // Gerir o clique no ícone de Remover        
        const btnDelete = document.getElementsByClassName("remove")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", function () {
                let idSpeaker = this.getAttribute("idspeaker");

                Swal.fire({
                    title: 'Tem a certeza?',
                    text: "Não será possível reverter a remoção!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Remover'
                }).then(async (result) => {
                    if (result.value) {
                        try {
                            const response = await fetch(`${urlBase}/speakers/${idSpeaker}`, {
                                method: "DELETE"
                            });

                            const result = await response.json();

                            if (result.success == true) {
                                Swal.fire({
                                    title: 'Removido!',
                                    text: result.message.pt,
                                    icon: 'success',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Fechar'
                                });
                            } else {
                                Swal.fire({
                                    title: 'Erro!',
                                    text: result.message.pt,
                                    icon: 'error',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Fechar'
                                });
                            }
                        } catch (err) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Erro',
                                text: err,
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Fechar'

                            });
                        }
                        renderSpeakers();
                    }
                });
            });
        }
    }
    renderSpeakers();
}
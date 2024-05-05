import {isUserAdmin, getUsers, removeUser, updateUser, registerUser, addUser, isUserLoged} from "../../../js/users.js";

if(isUserAdmin()) {

    console.log('Admin code - Usuaris.js');

    let userToEdit = undefined;
    let users = [];

    function handleURLChangeUser() {
        if (window.location.hash.split("?")[0].split("#")[1] === "editar-usuari") {
            if (userToEdit !== undefined) {
                setTimeout(async function () {
                    await loadEditUserForm();
                }, 200);
            } else {
                window.location.replace("dashboard.html");
            }
        }
    }

    window.addEventListener("hashchange", handleURLChangeUser);

    window.navigation.addEventListener("navigate", () => {
        if (userToEdit !== undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-usuari') {
            setTimeout(async function () {
                await loadEditUserForm();
            }, 200);
        }
    });

    if (userToEdit === undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-usuari') {
        window.location.replace('dashboard.html');
    }

    $(document).ready(async function () {

        await loadUsersTable();

        $(document).on("click", ".edit-user", async function () {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id_usuari === parseInt($(this).attr("data-user-id"))) {
                    userToEdit = users[j];
                    window.location.hash = "editar-usuari";
                    await loadEditUserForm();
                    break;
                }
            }
        });

        $(document).on("click", ".remove-user", async function () {
            await removeUserFromTable($(this).attr("data-user-id"));
        });

        $(document).on("click", '.dashboard-link[href="#all-usuaris"]', async function () {
            await loadUsersTable();
        });
    });

    $(document).on("submit", "#crear-formulari-usuari", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        console.log(formData);

        const user = {};
        formData.forEach((value, key) => {
            user[key] = value;
        });

        await addUser(user);
    });

    $(document).on("submit", "#editar-formulari-usuari", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        console.log(formData);

        const user = {};
        formData.forEach((value, key) => {
            user[key] = value;
        });

        await updateUser(user, userToEdit.id_usuari);
    });

    async function removeUserFromTable(id_usuari) {
        let hasBeenDeleted = await removeUser(id_usuari);
        if (hasBeenDeleted) {
            alert("Usuari eliminat!!");
            await loadUsersTable();
        } else {
            alert("No s'ha pogut eliminar correctament l\'usuari");
        }
    }


    async function loadUsersTable() {

        users = await getUsers();

        for(let i = 0; i < users.length; i++) {
            if(users[i].Email === isUserLoged().email) {
                users.splice(i, 1);
                break;
            }
        }

        $("#users-information").empty();

        for (let i = 0; i < users.length; i++) {
            let classOddEven = i % 2 === 0 ? "odd" : "even";
            $("#users-information").append('<tr class="' + classOddEven + '">');
            $("#users-information").append("<td>" + users[i].Email + "</td>");
            $("#users-information").append("<td>" + users[i].Nom + "</td>");
            $("#users-information").append("<td>" + users[i].Cognoms + "</td>");
            $("#users-information").append("<td>" + users[i].TipusUsuari + "</td>");
            $("#users-information").append("<td><span class='remove-user' href='#' data-user-id='" + users[i].id_usuari + "'><i class='fa-solid fa-trash'></i></span></td>");
            $("#users-information").append("<td><span class='edit-user dashboard-link' href='#editar-usuari?id=" + users[i].id_usuari + "' data-user-id='" + users[i].id_usuari + "'> <i class='fa-solid fa-pencil'></i></span></td>");
            $("#users-information").append("</tr>");
        }
    }

    async function loadEditUserForm() {
        $("#Email").val(userToEdit.Email);
        $("#Nom").val(userToEdit.Nom);
        $("#Cognoms").val(userToEdit.Cognoms);
        $("#TipusUsuari").val(userToEdit.TipusUsuari).change();
    }
}
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {userName: "praneeta", password: "praneeta", email: "praneeta@gmail.com"}
        ];

        var service = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword
        };
/*
        var service1 = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };  */
        return service;

        function findUserByUsernameAndPassword(currUserName, currPassword) {
            console.log(currUserName);
            console.log(currPassword);
            console.log(users);
            for (var user in users) {
                if ((users[user].userName.localeCompare(currUserName) == 0) && (users[user].password.localeCompare(currPassword) == 0)) {
                    console.log("found");
                    return user;
                }
                console.log(users[user].userName);
                console.log(users[user].password);
                console.log(users[user].email);
            }
        }

        function findAllUsers() {
            return users;
        }

        function createUser(newUser) {
            users.push(newUser);
        }

        function deleteUserById() {

        }

        function updateUser() {

        }
    }
}) ();
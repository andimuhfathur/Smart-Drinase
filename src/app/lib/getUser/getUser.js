export function getser() {
    try {

        const storedUser =
            localStorage.getItem("user");

        user = storedUser
            ? JSON.parse(storedUser)
            : null;

    } catch (error) {

        console.log(error);
    }

}
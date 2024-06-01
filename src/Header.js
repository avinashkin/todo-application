import bell from "../src/images/bell.png";
import user from "../src/images/user.png";
const Header = () => {
    return (
        <header className="w-full h-16 shadow-lg flex items-center justify-between">
            <h1 className="pl-28 align-middle text-3xl font-black">Todo List</h1>
            <div className="pr-20 gap-8 flex">
                <img src={bell} className="cursor-pointer" alt="notification" width="30" height="20" />
                <img src={user} className="cursor-pointer" alt="user" width="30" height="20" />
            </div>
        </header>
    );
};

export default Header;
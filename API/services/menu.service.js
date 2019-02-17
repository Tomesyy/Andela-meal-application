import dummyData from '../utils/dummyData';
import Menu from '../models/menu.model';

const menuService = {
    fetchAllMenu(){
        const validMenus = dummyData.menus.map((menu) => {
            const newMenu = new Menu();
            newMenu.id = menu.id;
            newMenu.name = menu.name;
            newMenu.details = menu.details;
            newMenu.price = menu.price;
            newMenu.delivery = menu.delivery;
            return newMenu;
        });
        return validMenus;
    },
    createMenu(menu){
        const menuLength = dummyData.menus.length;
        const lastId = dummyData.menus[menuLength - 1].id;
        const newId = lastId + 1;
        menu.id = newId;
        dummyData.menus.push(menu);
        return menu;
    }
}


export default menuService;
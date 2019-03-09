import dummyData from '../utils/dummyData';
import Menu from '../models/menu.model';

const menuService = {
    fetchAllMenu(){
        return Menu.findAll();
    },
    createMenu(menu){
        return Menu.create(menu);
    }
}


export default menuService;
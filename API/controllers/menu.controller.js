import menuService from '../services/menu.service';

const menuController = {
    fetchAllMenu(req, res){
        const allMenu = menuService.fetchAllMenu();
        return res.json({
            status: 'success',
            data: allMenu
        }).status(200);
    }, 
    createMeal(req, res){
        const newMenu = req.body;
        const createdMenu = menuService.createMenu(newMenu);
        return res.json({
            status: 'success',
            data: createdMenu
        }).status(201);
    }
}

export default menuController;
import menuService from '../services/menu.service';

const menuController = {
    fetchAllMenu(req, res){
        const allMenu = menuService.fetchAllMenu();
        return res.status(200).json({
            status: 'success',
            data: allMenu
        });
    }, 
    createMeal(req, res){
        const newMenu = req.body;

        if(!newMenu.name || !newMenu.price || !newMenu.delivery || !newMenu.details){
            return res.status(400).json({
                status: 'error',
                data: 'Input the Parameters Rightly'
            });
        }
        const createdMenu = menuService.createMenu(newMenu);
        return res.status(201).json({
            status: 'success',
            data: createdMenu
        });
    }
}

export default menuController;
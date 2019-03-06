import menuService from '../services/menu.service';

const menuController = {
    fetchAllMenu(req, res){
        const allMenu = menuService.fetchAllMenu();
        return allMenu
            .then(menu => {
                res.status(200).json({
                    status: 'success',
                    data: menu
                });
            })
            .catch(err => console.log(err));
    }, 
    createMeal(req, res){
        const newMenu = req.body;

        if(!newMenu.meals || !newMenu.catererId){
            return res.status(400).json({
                status: 'error',
                data: 'Input the Parameters Rightly'
            });
        }
        const createdMenu = menuService.createMenu(newMenu);
        return createdMenu
            .then(menu => {
                res.status(201).json({
                    status: 'success',
                    data: menu
                });
            })
            .catch(err => console.log(err));
    }
}

export default menuController;
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
    <header className={styles.header}>
        <nav className={`${styles.headerContent} pt-4 pb-4`}>
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex'}} className="mr-2 pl-5 pt-4 pr-5 pb-4">
                    <BurgerIcon type="primary"/>
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </div>
                <div style={{display: 'flex'}} className="pl-5 pt-4 pr-5 pb-4">
                    <ListIcon type="secondary"/>
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </div>
            </div>
            <div className={`${styles.logoItem} ml-30`}>
                <Logo/>
            </div>
            <div style={{display: 'flex'}} className="pl-5 pt-4 pr-5 pb-4">
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                </p>
            </div>
        </nav>
    </header>
    )
}
export default AppHeader;

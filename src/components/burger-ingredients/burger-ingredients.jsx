import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo,useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

import { openDataModal } from "../../services/actions/modalDataActions";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
import styles from "./burger-ingredients.module.css";

const ingredient = (state) => state.data;

const BurgerIngredients = () => {
  const { data } = useSelector(ingredient);
  const [current, setCurrent] = useState("bun");
  const ingredientsRef = useRef(null);
  const bunTabClickRef = useRef(null);
  const sauceTabClickRef = useRef(null);
  const mainTabClickRef = useRef(null);
  const [bunRef, inViewBuns] = useInView({ threshold: 0.1 });
  const [sauceRef, inViewSauces] = useInView({ threshold: 0.1 });
  const [mainRef, inViewMains] = useInView({ threshold: 0.1 });

  const handleIngredientScroll = () => {
    if (inViewBuns) {
      setCurrent("bun");
    } else if (inViewSauces) {
      setCurrent("sauce");
    } else if (inViewMains) {
      setCurrent("main");
    }
  };

  useEffect(() => {
    handleIngredientScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewBuns, inViewMains, inViewSauces]);

  const onClickTab = (type, ref) => {
    setCurrent(type);
    // eslint-disable-next-line babel/no-unused-expressions
    ref.current &&
      ref.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
  };

  const dataBun = useMemo(() => data && data.filter((item) => item.type === "bun"), [data]);
  const dataSauce = useMemo(() => data && data.filter((item) => item.type === "sauce"), [data]);
  const dataMain = useMemo(() => data && data.filter((item) => item.type === "main"), [data]);

  return (
    <section className={`${styles.burgerIngredients}`}>
      <div className="tabs">
        <div className="tabs__list">
          <Tab value="bun" active={current === 'bun'} onClick={() => onClickTab('bun', bunTabClickRef)}>Булки</Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={() => onClickTab('sauce', sauceTabClickRef)}>Соусы</Tab>
          <Tab value="main" active={current === 'main'} onClick={() => onClickTab('main', mainTabClickRef)}>Начинки</Tab>
          <span className="tabs__line"/>
        </div>
        <div className={`${styles.burgerIngredients__box} mt-10 scrollbar-vertical`} onChange={handleIngredientScroll} ref={ingredientsRef}>
          <div className={`${styles.burgerIngredients__inner}`} ref={bunRef}>
            <div ref={bunTabClickRef}>
              <BurgerIngredientsCategory categoryHeader="Булки">
                {dataBun.map(item => <BurgerIngredient key={item._id} item={item} openDataModal={openDataModal} />)}
              </BurgerIngredientsCategory>
            </div>
          </div>
          <div className={`${styles.burgerIngredients__inner}`} ref={sauceRef}>
            <div ref={sauceTabClickRef}>
              <BurgerIngredientsCategory categoryHeader="Соусы">
                {dataSauce.map(item => <BurgerIngredient key={item._id} item={item} openDataModal={openDataModal} />)}
              </BurgerIngredientsCategory>
            </div>
          </div>
          <div className={`${styles.burgerIngredients__inner}`} ref={mainRef}>
            <div ref={mainTabClickRef}>
              <BurgerIngredientsCategory categoryHeader="Начинки">
                {dataMain.map(item => <BurgerIngredient key={item._id} item={item} openDataModal={openDataModal} />)}
              </BurgerIngredientsCategory>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;

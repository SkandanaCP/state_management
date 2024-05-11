import { configureStore } from "@reduxjs/toolkit";
import CreateCategorySlice from "./CreateCategorySlice";
import CreateCatalogueSlice from "./CreateCatalogueSlice";
import CatalogueListSlice from "./CatalogueListSlice";
import EditCatalogue from "./EditCatalogue";
import ProductSlice from "./ProductSlice";
const store = configureStore({
  reducer: {
    createCategory: CreateCategorySlice,
    createCatalogue: CreateCatalogueSlice,
    catalogueList:CatalogueListSlice,
    EditCatalogue:EditCatalogue,
    ProductSlice:ProductSlice
  },
});

export default store;

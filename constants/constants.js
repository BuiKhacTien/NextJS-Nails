import { useRouter } from 'next/router'

export const useQuery = () => {
   return new URLSearchParams(useRouter().search);
}

export const showCard = (num) => {
   let result = '';
   for (let i in num) {
      if (i < num.length - 4) {
         result += "*";
      } else {
         result += num[i];
      }
   }
   return result
}

export const CATEGORIES = [
   {
      label: "All Departments",
      value: 1,
   },
   {
      label: "Dipping-Đắp-Ombré",
      value: 2,
   },
   {
      label: "Dipping Gel Base & Gel Top",
      value: 3,
   },
   {
      label: "3 in 1 Matching Color",
      value: 4,
   },
   {
      label: "Manicure",
      value: 5,
   },
   {
      label: "Pedicure Kit",
      value: 6,
   },
   {
      label: "COMBO SOAK OFF GEL",
      value: 7,
   },
   {
      label: "Nails Art &amp; Jewelry",
      value: 8,
   },
   {
      label: "Máy dũa - cây dũa - đầu dũa",
      value: 9,
   },
]
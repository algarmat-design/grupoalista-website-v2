/* ── Alista Salud — Product Catalog Data ──────────────────────────────── */

const CATEGORIES = [
  { slug: 'todos',       label: 'Todos',                count: 44 },
  { slug: 'inyeccion',   label: 'Insumos de Inyección', count: 8  },
  { slug: 'iv-infusion', label: 'Infusión & IV',         count: 14 },
  { slug: 'femenino',    label: 'Salud Femenina',        count: 3  },
  { slug: 'diabetico',   label: 'Cuidado Diabético',     count: 1  },
  { slug: 'hospitalario',label: 'Material Hospitalario', count: 18 },
];

const CATALOG = [
  /* ── Insumos de Inyección ──────────────────────────── */
  { id:'SAL-001', category:'inyeccion',   name:'Aguja Hipodérmica Amarilla',          img:'row_2_Image.jpg'   },
  { id:'SAL-002', category:'inyeccion',   name:'Aguja Hipodérmica Larga',             img:'row_3_Image.jpg'   },
  { id:'SAL-003', category:'inyeccion',   name:'Protector de Aguja Azul',             img:'row_4_Image.jpg'   },
  { id:'SAL-004', category:'inyeccion',   name:'Catéter Intravenoso Periférico',      img:'row_5_Image.jpg'   },
  { id:'SAL-040', category:'inyeccion',   name:'Jeringa Insulina 0.3ml U-100',        img:'row_28_Image.jpg'  },
  { id:'SAL-041', category:'inyeccion',   name:'Jeringa 1ml Graduada',                img:'row_29_Image.jpg'  },
  { id:'SAL-042', category:'inyeccion',   name:'Jeringa Desechable 3ml',              img:'row_30_Image.jpg'  },
  { id:'SAL-043', category:'inyeccion',   name:'Jeringa Desechable 5ml',              img:'row_31_Image.jpg'  },

  /* ── Infusión & IV ─────────────────────────────────── */
  { id:'SAL-008', category:'iv-infusion', name:'Catéter IV Ala Mariposa',             img:'row_9_Image.jpg'   },
  { id:'SAL-009', category:'iv-infusion', name:'Catéter IV Mariposa con Filtro',      img:'row_10_Image.jpg'  },
  { id:'SAL-015', category:'iv-infusion', name:'Catéter Intravenoso Central',         img:'row_17_Image.jpg'  },
  { id:'SAL-016', category:'iv-infusion', name:'Tubo de Extensión IV',                img:'row_18_Image.jpg'  },
  { id:'SAL-017', category:'iv-infusion', name:'Llave de Tres Vías',                  img:'row_19_Image.jpg'  },
  { id:'SAL-018', category:'iv-infusion', name:'Equipo de Venoclisis',                img:'row_20_Image.jpg'  },
  { id:'SAL-020', category:'iv-infusion', name:'Circuito IV Bifurcado',               img:'row_22_Image.jpg'  },
  { id:'SAL-027', category:'iv-infusion', name:'Tubo IV Flexible Amarillo',           img:'row_39_Image.jpg'  },
  { id:'SAL-028', category:'iv-infusion', name:'Tubo IV Flexible Transparente',       img:'row_40_Image.jpeg' },
  { id:'SAL-029', category:'iv-infusion', name:'Tubo IV Flexible Rojo',               img:'row_41_Image.jpg'  },
  { id:'SAL-030', category:'iv-infusion', name:'Sonda Urinaria Flexible',             img:'row_42_Image.jpg'  },
  { id:'SAL-032', category:'iv-infusion', name:'Tubo de Oxígeno Flexible',            img:'row_44_Image.jpg'  },
  { id:'SAL-033', category:'iv-infusion', name:'Catéter Urinario de Látex',           img:'row_45_Image.jpg'  },
  { id:'SAL-034', category:'iv-infusion', name:'Conector Doble Lúmen IV',             img:'row_32_Image.png'  },

  /* ── Salud Femenina ────────────────────────────────── */
  { id:'SAL-011', category:'femenino',    name:'Preservativos Aromatizados',          img:'row_13_Image.jpg'  },
  { id:'SAL-013', category:'femenino',    name:'Copa Menstrual Secret Cup',           img:'row_15_Image.jpg'  },
  { id:'SAL-019', category:'femenino',    name:'Espéculo Vaginal Metálico',           img:'row_21_Image.jpg'  },

  /* ── Cuidado Diabético ─────────────────────────────── */
  { id:'SAL-035', category:'diabetico',   name:'Monitor de Glucosa Gmate',            img:'row_34_Image.jpg'  },

  /* ── Material Hospitalario ─────────────────────────── */
  { id:'SAL-005', category:'hospitalario',name:'Guante de Sutura Estéril',            img:'row_6_Image.jpg'   },
  { id:'SAL-006', category:'hospitalario',name:'Bolsa de Esterilización Mixta',       img:'row_7_Image.jpg'   },
  { id:'SAL-007', category:'hospitalario',name:'Equipo Diagnóstico DLP',              img:'row_8_Image.jpg'   },
  { id:'SAL-010', category:'hospitalario',name:'Cepillo Dental Ergonómico',           img:'row_11_Image.jpg'  },
  { id:'SAL-012', category:'hospitalario',name:'Pinza Hemostática Quirúrgica',        img:'row_12_Image.jpg'  },
  { id:'SAL-014', category:'hospitalario',name:'Botella de Irrigación Médica',        img:'row_14_Image.jpg'  },
  { id:'SAL-016b',category:'hospitalario',name:'Mascarilla Quirúrgica Azul',          img:'row_16_Image.jpg'  },
  { id:'SAL-021', category:'hospitalario',name:'Guante de Nitrilo Negro',             img:'row_23_Image.jpg'  },
  { id:'SAL-022', category:'hospitalario',name:'Guante de Látex Blanco (S)',          img:'row_24_Image.jpg'  },
  { id:'SAL-023', category:'hospitalario',name:'Guante de Látex Blanco (M)',          img:'row_25_Image.jpg'  },
  { id:'SAL-024', category:'hospitalario',name:'Guante de Látex Blanco (L)',          img:'row_26_Image.jpg'  },
  { id:'SAL-025', category:'hospitalario',name:'Bisturí Quirúrgico Desechable',       img:'row_27_Image.jpg'  },
  { id:'SAL-026', category:'hospitalario',name:'Medicamento Oral en Caja',            img:'row_33_Image.jpg'  },
  { id:'SAL-036', category:'hospitalario',name:'Vitamina C en Polvo',                 img:'row_35_Image.jpg'  },
  { id:'SAL-037', category:'hospitalario',name:'Mascarilla N95 Respiratoria',         img:'row_36_Image.jpg'  },
  { id:'SAL-038', category:'hospitalario',name:'Rasuradora Desechable Médica',        img:'row_37_Image.jpg'  },
  { id:'SAL-039', category:'hospitalario',name:'Rollo de Esterilización Médico',      img:'row_38_Image.jpg'  },
  { id:'SAL-031', category:'hospitalario',name:'Toallitas Alcoholadas Desechables',   img:'row_43_Image.jpg'  },
];

const productos = [
  {
    id: "aparador-uspallata",
    nombre: "Aparador Uspallata",
    descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Silueta minimalista que realza el veteado natural.",
    medidas: "180 × 45 × 75 cm",
    materiales: "Nogal macizo FSC®, herrajes de latón",
    acabado: "Aceite natural ecológico",
    imagen: "assets/imgs/u9882697959_Mid-century_credenza_with_sliding_cane_doors_waln_48f4bcda-cd8b-4c82-89ea-4a63af596c3a_0.png",
    precio: 250000
  },
  {
    id: "biblioteca-recoleta",
    nombre: "Biblioteca Recoleta",
    descripcion: "Sistema modular de estantes con estructura de acero Sage Green y repisas en roble claro. Versátil y elegante.",
    medidas: "100 × 35 × 200 cm",
    materiales: "Estructura de acero, estantes de roble",
    acabado: "Laca mate ecológica",
    imagen: "assets/imgs/u9882697959_Modular_shelving_system_in_walnut_and_bronze_thre_2898f6a6-7eef-4f65-b2c5-8879e66b9409_3.png",
    precio: 180000
  },
  {
    id: "butaca-mendoza",
    nombre: "Butaca Mendoza",
    descripcion: "Butaca tapizada en bouclé Dusty Rose con base de guatambú. Diseño curvo para máximo confort.",
    medidas: "80 × 75 × 85 cm",
    materiales: "Guatambú macizo, tela bouclé",
    acabado: "Cera vegetal, tapizado premium",
    imagen: "assets/imgs/u9882697959_Reading_armchair_in_dusty_rose_velvet_C47A6D_with_1857c478-3140-4b63-8216-4404c36a8838_2.png",
    precio: 145000
  },
  {
    id: "sillon-copacabana",
    nombre: "Sillón Copacabana",
    descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en los 60.",
    medidas: "90 × 85 × 95 cm",
    materiales: "Cuero curtido vegetal, acero pintado",
    acabado: "Cuero anilina premium",
    imagen: "assets/imgs/u9882697959_Mid-century_modern_lounge_chair_photographed_for__16b83552-027a-4023-926c-f4bf0b045f8d_0.png",
    precio: 320000
  },
  {
    id: "mesa-centro-araucaria",
    nombre: "Mesa de Centro Araucaria",
    descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en nogal. Combina la frialdad del mármol con la calidez de la madera.",
    medidas: "90 × 90 × 45 cm",
    materiales: "Sobre de mármol Patagonia, patas de nogal",
    acabado: "Mármol pulido, aceite natural en madera",
    imagen: "assets/imgs/u9882697959_Sculptural_glass_coffee_table_with_an_organic_wal_4321c5be-134d-4724-a9dc-32c46b169ec4_0.png",
    precio: 210000
  },
  {
    id: "mesa-noche-aconcagua",
    nombre: "Mesa de Noche Aconcagua",
    descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble FSC®. Diseño limpio y funcional.",
    medidas: "45 × 35 × 60 cm",
    materiales: "Roble macizo FSC®, herrajes soft-close",
    acabado: "Barniz mate de poliuretano",
    imagen: "assets/imgs/u9882697959_Floating_nightstand_in_solid_walnut_with_single_d_591b625f-872c-4ea6-823f-6ecf6d555696_1.png",
    precio: 95000
  },
  {
    id: "cama-neuquen",
    nombre: "Cama Neuquén",
    descripcion: "Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza.",
    medidas: "160 × 200 × 90 cm",
    materiales: "Roble macizo FSC®, tapizado lino",
    acabado: "Aceite natural, tapizado premium",
    imagen: "assets/imgs/u9882697959_Platform_bed_with_floating_upholstered_headboard__fd6c7084-e43d-428b-996e-ce9737dcf1d1_0.png",
    precio: 340000
  },
  {
    id: "sofa-patagonia",
    nombre: "Sofá Patagonia",
    descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera.",
    medidas: "220 × 90 × 80 cm",
    materiales: "Madera de eucalipto FSC®, lino 100% natural",
    acabado: "Tapizado premium",
    imagen: "assets/imgs/u9882697959_Three-seater_mid-century_sofa_for_a_premium_furni_b5e12778-dfb8-48af-85fd-56eef164430b_0.png",
    precio: 280000
  },
  {
    id: "mesa-comedor-pampa",
    nombre: "Mesa Comedor Pampa",
    descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave.",
    medidas: "160-240 × 90 × 75 cm",
    materiales: "Roble macizo FSC®, mecanismo alemán",
    acabado: "Aceite-cera natural",
    imagen: "assets/imgs/u9882697959_Minimalist_dining_table_with_4_cm_solid_walnut_to_9532ff86-3bcd-4bc9-9aef-b0cab7481b51_0.png",
    precio: 310000
  },
  {
    id: "sillas-cordoba",
    nombre: "Sillas Córdoba",
    descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular Sage Green.",
    medidas: "45 × 52 × 80 cm (cada una)",
    materiales: "Contrachapado nogal, tubo de acero",
    acabado: "Laca mate, pintura epoxi",
    imagen: "assets/imgs/u9882697959_Set_of_two_walnut_dining_chairs_with_turned_spind_587c850e-90f8-4496-8590-a3d085f4e936_0.png",
    precio: 120000
  },
  {
    id: "escritorio-costa",
    nombre: "Escritorio Costa",
    descripcion: "Escritorio compacto con cajón organizado y tapa pasacables en bambú laminado.",
    medidas: "120 × 60 × 75 cm",
    materiales: "Bambú laminado, herrajes ocultos",
    acabado: "Laca mate resistente",
    imagen: "assets/imgs/u9882697959_Modern_desk_with_walnut_top_and_burnt_sienna_leat_d02533de-835f-4dd1-b1c4-b2ad6bcb5102_0.png",
    precio: 150000
  },
  {
    id: "silla-trabajo-belgrano",
    nombre: "Silla de Trabajo Belgrano",
    descripcion: "Silla ergonómica regulable con respaldo de malla y asiento en tejido reciclado.",
    medidas: "60 × 60 × 90-100 cm",
    materiales: "Malla técnica, tejido reciclado",
    acabado: "Base cromada, tapizado premium",
    imagen: "assets/imgs/u9882697959_Ergonomic_desk_chair_with_walnut_base_sage_green__99f4dc22-e324-4ee3-9484-c730095c1249_3.png",
    precio: 110000
  }
];
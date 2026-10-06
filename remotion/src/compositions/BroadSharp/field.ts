/** The AudienceField's state across the whole timeline — it never disappears; it changes behaviour. */
import { FIELD0, FieldState, keyTrack } from "../../brand";
import { C } from "./cues";

type K = { at: number; dur?: number } & Partial<FieldState>;
export const FIELD_KEYS: K[] = [
  // 01 expand
  { at: C.broad, dur: 1.9, spread: 1 },
  // 02 manual crops, then 03 release
  { at: C.interest, dur: 0.35, cx: 0.55, cy: 0.53, cw: 0.8, ch: 0.82 },
  { at: C.age, dur: 0.35, cw: 0.58, ch: 0.62 },
  { at: C.location, dur: 0.35, cw: 0.4, ch: 0.44 },
  { at: C.behaviour, dur: 0.35, cw: 0.22, ch: 0.27 },
  { at: C.aiDriven, dur: 1.8, cx: 0.5, cy: 0.5, cw: 1.3, ch: 1.3 },
  { at: C.whatCustomer, dur: 0.8, blur: 3.6 },
  { at: C.study, dur: 0.8, blur: 2.2 },
  // 04 study — rack focus to the brief, matching subset lights up
  { at: C.bizStrategy, dur: 0.8, blur: 3.4 },
  { at: C.ukMasters - 0.1, dur: 0.01, hlSeed: 1 },
  { at: C.ukMasters, dur: 0.5, hl: 0.3, hlK: 1 },
  { at: C.academic, dur: 0.5, hl: 0.16 },
  { at: C.budget, dur: 0.5, hl: 0.08 },
  { at: C.qualified, dur: 0.6, hl: 0.035 },
  // 05 dial — field recedes
  { at: C.stratNotBroad - 0.5, dur: 0.6, hlK: 0, hl: 0, o: 0.45, blur: 4.2 },
  // 06 doctor
  { at: C.doctor, dur: 0.6, o: 1, blur: 2.4 },
  { at: C.doctor + 0.7, dur: 0.01, hlSeed: 2 },
  { at: C.need, dur: 0.6, hl: 0.05, hlK: 1 },
  { at: C.formula, dur: 0.6, hlK: 0.55 },
  { at: C.realEstate, dur: 0.5, hlK: 0, hl: 0, o: 0.7 },
  { at: C.deliveryBroad, dur: 0.8, o: 1 },
  // 08 thesis — field steps back
  { at: C.bTargeting, dur: 0.6, o: 0.3 },
  { at: C.evenBroad, dur: 0.8, o: 1, blur: 2.4 },
  // 09 spine → context organises the field
  { at: C.clearer, dur: 2.2, org: 1, o: 0.6, blur: 3 },
  { at: C.aiContext - 0.1, dur: 0.01, hlSeed: 3 },
  { at: C.aiContext, dur: 0.6, hl: 0.12, hlK: 0.8 },
  { at: C.metaRanking - 0.3, dur: 0.8, org: 0, hlK: 0, hl: 0, o: 0.4, blur: 3.2 },
  // 11
  { at: C.whenISay, dur: 0.6, o: 0.75, blur: 2.6 },
  // 12 shift: manual → AI discovery → defined valuable customer
  { at: C.modern, dur: 0.6, o: 1, blur: 2.2 },
  { at: C.now, dur: 1.8, org: 1 },
  { at: C.customerV - 0.1, dur: 0.01, hlSeed: 4 },
  { at: C.customerV, dur: 0.6, hl: 0.06, hlK: 1 },
  // 13 close
  { at: C.fahad - 0.1, dur: 0.8, org: 0, hlK: 0, hl: 0, o: 0.22, blur: 4 },
  { at: C.broadDelivery, dur: 1.0, o: 0.8, blur: 2.8 },
];
export const field = (t: number) => keyTrack<FieldState>(t, FIELD_KEYS, FIELD0);

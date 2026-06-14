import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDoc,
  getDocs,
  query,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Cartas } from '../model/cartas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  constructor(private firestore: Firestore) {}

  // READ: Adicionado o { idField: 'id' } para capturar o ID do documento do Firebase
  listar(): Observable<Cartas[]> {
    const ref = collection(this.firestore, 'cartas');
    return collectionData(ref, { idField: 'id' }) as Observable<Cartas[]>;
  }

  // CREATE: Variável renomeada de 'prod' para 'carta' por clareza. Retorna a Promise.
  salvarCartas(carta: Cartas) {
    const ref = collection(this.firestore, 'cartas');
    return addDoc(ref, carta);
  }

  // UPDATE: Recebe o ID da carta e os novos dados para atualização
  atualizarCarta(id: string, carta: Partial<Cartas>) {
    const docRef = doc(this.firestore, `cartas/${id}`);
    return updateDoc(docRef, { ...carta });
  }

  // DELETE: Recebe o ID e exclui o documento do banco
  excluirCarta(id: string) {
    const docRef = doc(this.firestore, `cartas/${id}`);
    return deleteDoc(docRef);
  }
}

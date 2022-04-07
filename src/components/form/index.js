import React, { useState } from "react";
import { Button, StyleSheet,TextInput, View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';
import styles from "../../style";
import TakePicture from '../camera';



export default function Form() {

  let [matricula, setMatricula] = useState(null);
  let [codigo, setCodigo] = useState(null);
  let [isOpen, setIsOpen] = useState(false);
  let [situacao, setSituacao] = useState("selecione uma situação");
  let [selectedValue, setSelectedValue] = useState("default");

  function validar() {
    if(matricula != null && selectedValue != "default" && codigo != null) {
        setIsOpen(true)
    } else {
        Alert.alert('Todos os campos devem ser preenchidos!')
    }
  }

    function confirmarEnvio() {
      setIsOpen(false)
      setMatricula(null)
      setCodigo(null)
      setSelectedValue("default")
  }

  return (
    
    <View style={styles.formContext}>
      <View style={styles.form}>
          <Text style={styles.text}>Matricula:</Text>
          <TextInput
            style={styles.textInput}
            value={matricula}
            onChangeText={setMatricula}
            placeholder="Ex. 12345"
            keyboardType="numeric"
          ></TextInput>
          <Text style={styles.text}>Codigo:</Text>
          <TextInput
            style={styles.textInput}
            value={codigo}
            onChangeText={setCodigo}
            placeholder="Ex. E134EB12"
          ></TextInput>
          <Text style={styles.text}>Situacao:</Text> 
         
          <Picker style={styles.selectInput}
            //selectedValue={situacao}
            selectedValue={selectedValue}
            //onValueChange={(item, indexItem)=>{setSituacao(item)}}
            onValueChange={(itemValue, indexItem)=>setSelectedValue(itemValue)}

          >
                <Picker.item key={0} label="Leitura Implausível" value="Leitura Implausível"/>
                <Picker.item key={1} label="Releitura" value="Releitura"/>
                <Picker.item key={2} label="Situação de Risco" value="Situação de Risco"/>
                <Picker.item key={3} label="Suspeita de Fraude" value="Suspeita de Fraude"/>
                <Picker.item key={4} label="Impedimento de leitura" value="Impedimento de leitura"/>
          </Picker> 
          <TouchableOpacity  style={styles.button} onPress={ () => validar()}>
            <Text style={styles.buttonText}>Tirar foto</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={isOpen}>
                <TakePicture 
                    matricula={matricula}
                    codigo={codigo}
                    situacao={selectedValue}
                    confirmarEnvio={confirmarEnvio}
                />
            </Modal>
      </View>
    </View>
  );
}

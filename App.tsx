import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react'
import { Button, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'

const DISMISS_AFTER_MS = 2500

export default function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const append = (line: string) => setLog(lines => [...lines, line])

  const pick = async (label: string) => {
    append(`${label}: calling getDocumentAsync`)
    try {
      const result = await DocumentPicker.getDocumentAsync()
      append(`${label}: settled, canceled=${result.canceled}`)
    } catch (error) {
      append(`${label}: rejected, ${String(error)}`)
    }
  }

  const pickThenDismissPresenter = () => {
    setTimeout(() => {
      append('dismissing the modal under the picker')
      setModalVisible(false)
    }, DISMISS_AFTER_MS)
    pick('pick 1')
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>expo-document-picker orphaned pick</Text>
      <Button title="1. Open modal" onPress={() => setModalVisible(true)} />
      <Button title="3. Pick again" onPress={() => pick('pick 2')} />
      <ScrollView style={styles.log}>
        {log.map((line, index) => (
          <Text key={index} style={styles.line}>
            {line}
          </Text>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.screen}>
          <Text style={styles.heading}>Modal</Text>
          <Button
            title={`2. Pick, then dismiss this modal after ${DISMISS_AFTER_MS}ms`}
            onPress={pickThenDismissPresenter}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 80, paddingHorizontal: 16, gap: 12 },
  heading: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  log: { flex: 1, marginTop: 12 },
  line: { fontSize: 13, marginBottom: 6 },
})

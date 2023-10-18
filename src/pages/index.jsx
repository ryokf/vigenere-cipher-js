import InputField from '@/components/InputField'
import decryptProcess from '@/logic/decrypt';
import encryptProcess from '@/logic/encrypt'
import { inter } from '@/theme/theme'
import { useRef, useState } from 'react'


export default function Home() {
  const [result, setResult] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);

  const encrypt = (event) => {
    event.preventDefault();
    const plainText = event.target.plainText.value;
    const key = event.target.key.value;
    setResult(encryptProcess(plainText, key).encryptedText);
  }

  const decrypt = (event) => {
    event.preventDefault();
    const cipherText = event.target.encryptedText.value;
    const key = event.target.key.value;
    setResult(decryptProcess(cipherText, key));
  }

  const testAPI = async () => {
    const response = await fetch('/api/hello');
    const data = await response.json();

    await fetch(`/api/output?encryptedText=${encryptProcess(data.data, 'kunci').encryptedText}`);
  }

  testAPI();

  const fileInputRef = useRef();

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', fileInputRef.current.files[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File berhasil diunggah');
        // Tambahkan logika lain sesuai kebutuhan Anda
      } else {
        console.log('Gagal mengunggah file');
      }
    } catch (error) {
      console.error('Terjadi kesalahan', error);
    }
  };

  return (
    <div
      className={`flex flex-col gap-6 h-screen items-center justify-center ${inter.className}`}
    >
      <h1 className='text-6xl'>Vigenere Cipher </h1>

      <div className="flex gap-2 justify-center">
        <button onClick={() => setIsEncrypt(true)} type='submit' className={`${isEncrypt ? "bg-violet-500 text-white" : "border border-violet-500 text-violet-500"} text-sm px-4 py-2 rounded-md`}>Encrypt</button>
        <button onClick={() => setIsEncrypt(false)} type='submit' className={`${!isEncrypt ? "bg-violet-500 text-white" : "border border-violet-500 text-violet-500"} text-sm px-4 py-2 rounded-md`}>Decrypt</button>
      </div>

      <form onSubmit={isEncrypt ? encrypt : decrypt} className="flex flex-col gap-1">
        <InputField name={isEncrypt ? 'plainText' : 'encryptedText'} className={`my-2`} placeholder={isEncrypt ? 'Plain text' : 'Cipher text'}></InputField>
        <InputField name={'key'} className={`my-2`} placeholder={'Key'}></InputField>
        {
          (result.length != 0)
            ? <p className='text-lg font-medium'>Hasil : {result}</p>
            : ""
        }

        <button type='submit' className='bg-violet-500 w-full text-sm text-white px-4 py-2 rounded-md my-2'>Process</button>
      </form>
      <div className='flex flex-col bg-zinc-600 w-1/4 text-sm text-white px-4 py-2 rounded-md'>
        <h1 className='text-xl font-semibold text-center mt-2 mb-5'>Encrypt File</h1>
        <div className="m-auto">
          <input className='bg-zinc-800 outline-none' type="file" name="file" ref={fileInputRef} />
          <button className='text-center bg-violet-500 text-sm text-white px-2 py-0.5 rounded-r-md' type='button' onClick={handleFileUpload}>Unggah</button>
        </div>
        <a className='block m-auto mt-5 bg-violet-500 text-sm text-white px-4 py-2 rounded-md my-2' href="output.txt" download="output.txt">download</a>
      </div>
    </div>
  )
}

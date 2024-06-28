import { useRef, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import Button from "../ui/Button";
import { useUser } from "../../contexts/UserContext";

const CheckInModal = ({ onCheckInModal, onRefetch }) => {
  const { user } = useUser();
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleFileUpload = event => {
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onloadend = function () {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSendFile = async event => {
    event.preventDefault();

    if (!preview) return;

    try {
      const { data: { data: secretUrl } } = await axiosInstance.post("/attendances/upload-photo", {
        image_url: preview
      });

      const payload = {
        userId: user?.id,
        evidence: secretUrl
      };

      await axiosInstance.post("/attendances", payload);

      await onRefetch(true);
      onCheckInModal(false);
    } catch (error) {
      console.error(error);
    };
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    };
  };

  return (
    <div className="z-[750] flex items-center justify-center backdrop-blur-sm bg-black/50 fixed inset-0">
      <div className="w-[480px] rounded-md bg-white p-8 space-y-4">
        <div className="heading text-center">
          <h2 className="text-2xl font-bold text-accent">Lampirkan Bukti Foto</h2>
          <em className="text-sm">*foto bekerja di rumah (maksimal 20MB)</em>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="file"
              id="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
            <Button
              className="flex-1 bg-accent text-white duration-200 hover:bg-accent-hover"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
          <figure className="w-full border rounded-md aspect-square flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Evidence preview" className="object-contain w-full h-full" />
            ) : (
              <span>Preview bukti foto</span>
            )}
          </figure>
          <div className="flex gap-4">
            <Button
              className={`flex-1 ${!preview ? "bg-primary cursor-not-allowed" : "bg-green-500 hover:bg-accent-hover"} text-white duration-200`}
              disabled={!preview}
              onClick={handleSendFile}
            >
              Check In
            </Button>
            <Button
              className="flex-1 bg-accent text-white duration-200 hover:bg-accent-hover"
              onClick={() => onCheckInModal(false)}
            >
              Batal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
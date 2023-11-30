import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure();
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        // console.log(imgResponse);
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, price, category, recipe } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imgURL,
          };
          console.log(newItem);
          axiosSecure.post("/menu", newItem).then((data) => {
            console.log("after posting data", data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  return (
    <div className="border w-9/12">
      <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="recipe"
              className="input input-bordered"
              required
            />
          </div>
          <div className="flex gap-10">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                className="select select-bordered"
                defaultValue="Pick one"
                {...register("category", { required: true })}
              >
                <option disabled>Pick one</option>
                <option>salad</option>
                <option>pizza</option>
                <option>soup</option>
                <option>dessert</option>
                <option>drinks</option>
              </select>
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="price"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-accent"
              placeholder="Bio"
            ></textarea>
          </div>
          <div className="form-control ">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Add An Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;

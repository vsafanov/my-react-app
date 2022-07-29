import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import  ExecuteApi from "../../ClientApi";
import moment from "moment";
import DealHeader from "./aws/DealHeader";
import { useEffect, useState } from "react";
import CustomInput from "./aws/CustomInput";
import configData from "../../config.json";

const Index = () => {
  const [listChecked, setListChecked] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [{ result, loading, error }] =  ExecuteApi(`${configData.SERVER_URL}/dealslist/`);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues: { result },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    // setData(JSON.stringify(data))
    alert(JSON.stringify(data, null, 2));
    // reset()
  };

  const convertDate = (date) => {
    return date ? moment(date).format("YYYY-MM-DD") : null;
  };

  const onError = (errors, e) => console.log(errors, e);

  const Check = (e) => {
    let list = [...listChecked];
    const { id, checked } = e.target;
    let updated = list.map((el) =>
      el.id === id ? { ...el, checked: checked } : el
    );
    setListChecked(updated);
    console.log(updated);
  };

  const CheckAll = (e) => {
    let list = [...listChecked];
    const { checked } = e.target;

    let updated = list.map((el) => ({ ...el, checked: checked }));
    setListChecked(updated);
    console.log(e.target.checked, "|", checkedAll);
    setCheckedAll(checked);

    console.log(updated);
  };

  useEffect(() => {
    if (!loading) {
      var chk = [];
      result?.slice(0, 3).map((item) => {
        return chk.push({ id: "chk_" + item.dealId, checked: false });
      });
      setListChecked(chk);
      console.log("l", chk);
      setIsReady(true);
    }
  }, [loading]);

  return (
    <>
      {isReady && (
        <main style={{ textAlign: "center", padding: "10px" }}>
          <form onSubmit={handleSubmit(onSubmit, onError)} id="dealForm">
            <div className="container-fluid">
              <DealHeader onCheckAll={CheckAll} isCheckedAll={checkedAll}>
                {result.slice(0, 3).map((item, index) => {
                  let checked = listChecked.filter( (i) => i.id === `chk_${item.dealId}`
                  )[0]?.checked;
                  // console.log(item.DealID,checked)
                  return (
                    <div className="row flex g-1" key={index}>
                      <hr />
                      <div className="col-1">
                        <input
                          type="hidden"
                          value={item.dealId}
                          {...register(`result.${index}.dealId`)}
                        />
                        <FormControlLabel
                          label={
                            <span style={{ fontSize: "12px" }}>
                              {item.dealId}
                            </span>
                          }
                          control={
                            <Checkbox
                              id={`chk_${item.dealId}`}
                              checked={checked}
                              size="small"
                              onChange={Check}
                            />
                          }
                        />
                      </div>

                      <div className="col-1">
                        <CustomInput
                          {...register(`result.${index}.Posted`)}
                          id={item.id}
                          label="Posted"
                          defaultValue={convertDate(item.postedDate)}
                          type="date"
                        />
                        {/* <TextField
                            key={`Status_${item.id}`}
                            InputLabelProps={{ shrink: true }}
                            label="Status"
                            fullWidth={true}
                            size="small"
                            type="text"
                            InputProps={{ style: { fontSize: 12 } }}
                            defaultValue={item.Status}
                            {...register(`result.${index}.Status`)}
                          // onChange={handleChange}
                          /> */}
                      </div>
                      <div className="col-1">
                        <CustomInput
                          {...register(`result.${index}.Status`)}
                          id={item.id}
                          label="Status"
                          defaultValue={item.status.status1}
                          type="text"
                        />
                      </div>
                      <div className="col-1">
                        <TextField
                          key={`Expired_${item.id}`}
                          InputLabelProps={{ shrink: true }}
                          label="Expired"
                          fullWidth={true}
                          defaultValue={convertDate(item.expirationDate)}
                          size="small"
                          type="date"
                          InputProps={{ style: { fontSize: 12 } }}
                          // focused
                          {...register(`result.${index}.Expired`)}
                        // onChange={handleChange}
                        />
                      </div>
                      <div className="col-2">
                        <TextField
                          label="Categories"
                          key={`Categories_${item.id}`}
                          size="small"
                          type="text"
                          InputProps={{ style: { fontSize: 12 } }}
                          defaultValue={item.categories.category1}
                          {...register(`result.${index}.Categories`)}
                        // onChange={handleChange}
                        />
                      </div>
                      <div className="col-2">
                        <TextField
                          label="Title"
                          key={`Title_${item.id}`}
                          size="small"
                          multiline
                          rows={5}
                          fullWidth={true}
                          type="text"
                          InputProps={{ style: { fontSize: 12 } }}
                          defaultValue={item.title}
                          {...register(`result.${index}.Title`)}
                        // onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <TextField
                          label="Details"
                          key={`Details_${item.id}`}
                          size="small"
                          multiline
                          rows={5}
                          fullWidth={true}
                          type="text"
                          InputProps={{ style: { fontSize: 12 } }}
                          defaultValue={item.details}
                          {...register(`result.${index}.Details`)}
                        // onChange={handleChange}
                        />
                      </div>
                    </div>
                  );
                })}
              </DealHeader>
            </div>
          </form>
          <Button
            className="primary"
            form="dealForm"
            type="submit"
            onClick={() => alert(JSON.stringify(listChecked, null, 2))}
          >
            Save
          </Button>
        </main>
      )}
    </>
  );
};

export default Index;

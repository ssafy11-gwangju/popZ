package popz.solpop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PopUpStore {

  @Id
  private String popUpStoreNo;
  private java.sql.Date popUpStoreStartDate;
  private java.sql.Date popUpStoreEndDate;
  private String popUpStorePlace;
  private String popUpStoreDetail;
  private String popUpStoreKeyword;
  private long popUpStorePriorityReservation;
  private long popUpStoreMaxPeople;
  private String popUpStoreImgUrl;
  private long popUpStorePrice;


}
